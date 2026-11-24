import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { retrieveChunks, terms, tokenise } from '../src/retrieval.js';

const KB = JSON.parse(await readFile(new URL('../knowledge-base.json', import.meta.url), 'utf8'));
const TOP_K = 5;
// The worker passes the model only this much of what is retrieved.
const CONTEXT_CHARS = 2600;

const top = q => retrieveChunks(KB.chunks, q, TOP_K);
const context = q => top(q).map(c => c.text).join('\n\n').slice(0, CONTEXT_CHARS);

// Each question must put an entry of the expected kind first.
const expected = [
  ['How many research studies are on the Research page, and what is the newest one about?', /^research\.overview$/],
  ['What is his newest study?', /^research\.(overview|leak)$/],
  ['What is his latest research?', /^research\.(overview|leak)$/],
  ['Tell me about the satellite radar work', /^research\.flood$/],
  ['What did the leak repair study find?', /^research\.leak$/],
  ['How was the research produced?', /^research\.method$/],
  ['Has he published any papers?', /^research\.(overview|method)$/],
  ['What qualifications does Paul have?', /^edu\./],
  ['Where did Paul study?', /^edu\./],
  ['What certifications does he hold?', /^certs$/],
  ['What skills does he have?', /^skill\./],
  ['What are his principles?', /^principle\./],
  ['Is Paul available for hire?', /^profile\.availability$/],
  ['How can I contact him?', /^profile\.contact$/],
  ['What is the Voice app?', /^demo\.voice$/],
];

for (const [question, want] of expected) {
  test(`"${question}" retrieves ${want}`, () => {
    const found = top(question);
    assert.ok(found.length > 0, 'nothing retrieved');
    assert.match(found[0].id, want, `got ${found.slice(0, 3).map(c => c.id).join(', ')}`);
  });
}

test('flood study questions give the model the held-out figures and the Bolivia caveat', () => {
  for (const q of ['What did the flood mapping study find?', 'Is the flood study finished?']) {
    const given = context(q);
    assert.match(given, /limited evidence/, q);
    assert.match(given, /96\.2%/, q);
  }
  assert.match(context('What is his newest study?'), /first look/);
});

test('a question about one study gives the model that study\'s whole entry', () => {
  for (const [q, id] of [
    ['What did the river study find?', 'research.river'],
    ['What did the drug study find?', 'research.drug'],
    ['What did the flood mapping study find?', 'research.flood'],
    ['What did the leak repair study find?', 'research.leak'],
  ]) {
    const entry = KB.chunks.find(c => c.id === id);
    assert.ok(context(q).includes(entry.text), `${q}: ${top(q).map(c => c.id).join(', ')}`);
  }
});

test('entries with equal scores keep the knowledge file\'s order', () => {
  const found = top('Tell me about his experience').filter(c => c.id.startsWith('exp.')).map(c => c.id);
  assert.deepEqual(found, [...found].sort());
  assert.equal(found[0], 'exp.0');
});

test('a question made only of common words falls back to the profile', () => {
  assert.equal(top('Who is Paul?')[0].id, KB.chunks[0].id);
  assert.equal(KB.chunks[0].category, 'profile');
});

test('common words in the question do not score', () => {
  const plain = top('flood mapping');
  const padded = top('what did the flood mapping do');
  assert.deepEqual(padded.map(c => c.id), plain.map(c => c.id));
});

test('plurals are folded on both sides', () => {
  assert.deepEqual(terms('Skills, studies and floods'), ['skill', 'study', 'and', 'flood']);
  assert.deepEqual(terms('class analysis status'), ['class', 'analysis', 'status']);
});

test('a keyword of several words matches on each word', () => {
  const chunks = [
    { id: 'a', text: 'First entry.', keywords: ['label noise'] },
    { id: 'b', text: 'Second entry.', keywords: [] },
  ];
  assert.deepEqual(retrieveChunks(chunks, 'noise', 5).map(c => c.id), ['a']);
});

test('an empty knowledge base retrieves nothing', () => {
  assert.deepEqual(retrieveChunks([], 'flood', TOP_K), []);
});

test('tokenise lower-cases and keeps technical tokens', () => {
  assert.deepEqual(tokenise('C++ and C# on Sentinel-1'), ['c++', 'and', 'c#', 'on', 'sentinel-1']);
});
