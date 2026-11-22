#!/usr/bin/env node
/* Build or check the flood study numbers shown on /research/.

   The page reads _data/research_flood.json. This script derives that file
   from the study's own result files, so the published figures cannot drift
   from the repository they describe. Development chips only: the study's
   test and Bolivia results are not read here.

     node scripts/research-flood-numbers.js <flood-repo>           check, exit 1 on mismatch
     node scripts/research-flood-numbers.js <flood-repo> --write   regenerate the data file
*/
const fs = require('fs');
const path = require('path');

const [repo, flag] = process.argv.slice(2);
if (!repo) {
  console.error('usage: node scripts/research-flood-numbers.js <flood-repo> [--write]');
  process.exit(2);
}

const OUT = path.join(__dirname, '..', '_data', 'research_flood.json');
const MODELS = [
  { id: 'unet', folder: 'unet_baseline' },
  { id: 'frozen', folder: 'terramind_frozen' },
  { id: 'updated', folder: 'terramind_updated' },
];
const SEEDS = ['0', '1', '2'];

const load = (folder, file) =>
  JSON.parse(fs.readFileSync(path.join(repo, 'results', folder, file), 'utf8'));

const mean = xs => xs.reduce((a, b) => a + b, 0) / xs.length;
const round = (x, dp) => Number(x.toFixed(dp));
const pct = x => 100 * x;

// A share measured on three seeds: the mean, the lowest and highest seed,
// and text forms that keep trailing zeros, which Liquid would drop.
const share = (values, dp) => ({
  mean: round(pct(mean(values)), 2),
  min: round(pct(Math.min(...values)), 2),
  max: round(pct(Math.max(...values)), 2),
  text: {
    mean: pct(mean(values)).toFixed(dp),
    seeds: values.map(v => pct(v).toFixed(dp)).join(', '),
  },
});

let otsu = null;
let fingerprint = null;

const models = MODELS.map(({ id, folder }) => {
  const scores = load(folder, 'development_scores.json');
  const errors = load(folder, 'error_reproduction_development.json');

  // Every model must be scored on the same pixels against the same labels.
  const thisOtsu = JSON.stringify(scores.otsu.counts);
  if (otsu && thisOtsu !== JSON.stringify(otsu.counts)) {
    throw new Error(`${folder}: the Otsu counts differ from the other models'`);
  }
  otsu = scores.otsu;
  for (const f of [scores.split_fingerprint, errors.split_fingerprint]) {
    if (fingerprint && f !== fingerprint) throw new Error(`${folder}: a different split fingerprint`);
    fingerprint = f;
  }

  const seedScores = SEEDS.map(s => scores.seeds[s]);
  const seedErrors = SEEDS.map(s => errors.seeds[s]);
  const rates = key => seedErrors.map(e => e.rates[key]);
  const falseWater = seedErrors[0].counts.otsu_false_water;
  const repeatedFalse = mean(seedErrors.map(e => e.counts.repeated_false_water));
  const ious = seedScores.map(s => s.iou);
  const stop = SEEDS.map(s => scores.kept[s].kept_stop_iou_against_otsu);

  return {
    id,
    false_water: share(rates('reproduction_false_water'), 1),
    missed_water: share(rates('reproduction_missed_water'), 1),
    correct: share(rates('agreement_where_otsu_correct'), 2),
    iou: {
      mean: round(mean(ious), 4),
      text: { mean: mean(ious).toFixed(3), seeds: ious.map(v => v.toFixed(3)).join(', ') },
    },
    recall: pct(mean(seedScores.map(s => s.recall))).toFixed(1),
    precision: pct(mean(seedScores.map(s => s.precision))).toFixed(1),
    // Thousands of pixels, mean of the seeds.
    corrected_false_water_k: Math.round((falseWater - repeatedFalse) / 1000),
    new_false_water_k: Math.round(mean(rates('new_false_water_pixels')) / 1000),
    new_missed_water_k: Math.round(mean(rates('new_missed_water_pixels')) / 1000),
    stop_iou: { min: Math.min(...stop).toFixed(2), max: Math.max(...stop).toFixed(2) },
    kept_epochs: SEEDS.map(s => scores.kept[s].kept_epoch),
  };
});

const c = otsu.counts;
const fresh = {
  source: 'results/{unet_baseline,terramind_frozen,terramind_updated}/*_development.json',
  metric: 'Development chips (252 hand-labelled chips), three seeds per model',
  split_fingerprint: fingerprint.slice(0, 12),
  pixels: {
    valid: c.tp + c.fp + c.fn + c.tn,
    otsu_false_water: c.fp,
    otsu_missed_water: c.fn,
    text: {
      otsu_false_water: (c.fp / 1e6).toFixed(2),
      otsu_missed_water: (c.fn / 1e6).toFixed(2),
    },
  },
  otsu: {
    iou: otsu.iou.toFixed(3),
    recall: pct(otsu.recall).toFixed(1),
    precision: pct(otsu.precision).toFixed(1),
  },
  models,
};

if (flag === '--write') {
  fs.writeFileSync(OUT, JSON.stringify(fresh, null, 2) + '\n');
  console.log(`wrote ${path.relative(process.cwd(), OUT)}`);
  process.exit(0);
}

const published = JSON.parse(fs.readFileSync(OUT, 'utf8'));
if (JSON.stringify(published) === JSON.stringify(fresh)) {
  console.log('flood numbers match the study results');
} else {
  console.error(`${path.relative(process.cwd(), OUT)} differs from the study results. Re-run with --write and review the diff.`);
  process.exit(1);
}
