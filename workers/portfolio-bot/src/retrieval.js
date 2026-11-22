/**
 * Keyword search over the knowledge base. Pure functions, no Worker APIs,
 * so they can be tested with plain Node (test/retrieval.test.mjs).
 */

// Words too common to say what a question is about. They are dropped from
// the question only. Left in, a long entry outranks the right one just by
// containing "what", "did" and "Paul".
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'of', 'to', 'in', 'on', 'for', 'with', 'at', 'by', 'from',
  'about', 'as', 'if', 'so', 'than', 'then', 'is', 'are', 'was', 'were', 'be', 'been', 'am',
  'do', 'does', 'did', 'done', 'has', 'have', 'had', 'can', 'could', 'would', 'should', 'will',
  'what', 'which', 'who', 'whom', 'whose', 'where', 'when', 'why', 'how',
  'it', 'its', 'this', 'that', 'these', 'those', 'there', 'here',
  'he', 'him', 'his', 'she', 'her', 'you', 'your', 'me', 'my', 'we', 'our', 'they', 'their',
  'paul', 'martin', 'mcneill', 'tell', 'give', 'show', 'say', 'please', 'any', 'some',
  'not', 'no', 'yes', 'one', 'also', 'more', 'most', 'know', 'knows', 'doing', 'got',
]);

export function tokenise(s) {
  return (String(s).toLowerCase().match(/[a-z0-9+#-]{2,}/g) || []);
}

// Fold simple plurals so "skills" finds "skill" and "studies" finds "study".
// Applied to questions, entry text and keywords alike, so it only has to be
// consistent, not linguistically right.
function stem(t) {
  if (t.length > 4 && t.endsWith('ies')) return t.slice(0, -3) + 'y';
  if (t.length > 3 && t.endsWith('s') && !/(ss|us|is)$/.test(t)) return t.slice(0, -1);
  return t;
}

/** The search terms in a piece of text: lower-cased tokens with plurals folded. */
export function terms(s) {
  return tokenise(s).map(stem);
}

/**
 * BM25-lite: overlap between the question's words and each entry's text and
 * keywords, weighted so that rarer words count for more. Returns up to topK
 * entries, best first. A question made only of stop words ("Who is Paul?")
 * returns the first topK entries, which start with the profile.
 */
export function retrieveChunks(chunks, message, topK) {
  if (!chunks || !chunks.length) return [];

  const qTerms = new Set(tokenise(message).filter(t => !STOP_WORDS.has(t)).map(stem));
  if (qTerms.size === 0) return chunks.slice(0, topK).map(c => ({ ...c, score: 0 }));

  const docCount = chunks.length;
  // A keyword may be several words ("label noise"); each word counts.
  const keywordSets = chunks.map(c => new Set((c.keywords || []).flatMap(k => terms(k))));
  const termSets = chunks.map((c, i) => new Set([...terms(c.text), ...keywordSets[i]]));
  const df = new Map();
  for (const set of termSets) {
    for (const t of set) df.set(t, (df.get(t) || 0) + 1);
  }
  const scored = chunks.map((c, i) => {
    let score = 0;
    let keywordHit = false;
    for (const t of qTerms) {
      if (termSets[i].has(t)) {
        const n = df.get(t) || 0;
        score += Math.log(1 + (docCount - n + 0.5) / (n + 0.5));
        if (keywordSets[i].has(t)) keywordHit = true;
      }
    }
    // small bonus for keyword (vs body) hits
    if (keywordHit) score *= 1.15;
    return { ...c, score };
  });
  // The sort is stable, so entries with equal scores keep the knowledge
  // file's order: profile first, most recent role first, overview before
  // the individual studies.
  return scored.sort((a, b) => b.score - a.score).slice(0, topK).filter(c => c.score > 0);
}
