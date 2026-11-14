#!/usr/bin/env node
/* Build or check the river study numbers shown on /research/.

   The page reads _data/research_skill.json. This script derives that file
   from the study's own per-catchment results, so the published figures
   cannot drift from the repository they describe.

     node scripts/research-numbers.js <river-repo>           check, exit 1 on mismatch
     node scripts/research-numbers.js <river-repo> --write   regenerate the data file
*/
const fs = require('fs');
const path = require('path');

const [repo, flag] = process.argv.slice(2);
if (!repo) {
  console.error('usage: node scripts/research-numbers.js <river-repo> [--write]');
  process.exit(2);
}

const SOURCE = 'results/per_catchment_baselines.csv';
const OUT = path.join(__dirname, '..', '_data', 'research_skill.json');
const MODELS = ['persistence', 'gbm', 'gbm_perfect_forecast'];
const LEADS = [1, 3, 7];

const rows = fs.readFileSync(path.join(repo, SOURCE), 'utf8').trim().split(/\r?\n/);
const header = rows.shift().split(',');
const col = name => {
  const i = header.indexOf(name);
  if (i < 0) throw new Error(`${SOURCE} has no column "${name}"`);
  return i;
};
const iGauge = col('gauge_id'), iLead = col('lead_days'), iModel = col('model'), iNse = col('nse');

// The boosting model was fitted with three seeds. Average them per
// catchment first, so every catchment counts once in the percentiles.
const perCatchment = new Map();
for (const line of rows) {
  const f = line.split(',');
  const nse = parseFloat(f[iNse]);
  if (!MODELS.includes(f[iModel]) || Number.isNaN(nse)) continue;
  const key = `${f[iModel]}|${f[iLead]}|${f[iGauge]}`;
  if (!perCatchment.has(key)) perCatchment.set(key, []);
  perCatchment.get(key).push(nse);
}

const mean = xs => xs.reduce((a, b) => a + b, 0) / xs.length;

// Linear interpolation between order statistics (the numpy default).
const quantile = (sorted, q) => {
  const pos = (sorted.length - 1) * q;
  const lo = Math.floor(pos), hi = Math.ceil(pos);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
};
const round = (x, dp) => Number(x.toFixed(dp));

const skill = LEADS.map(lead => ({
  lead_days: lead,
  models: MODELS.map(model => {
    const values = [];
    for (const [key, xs] of perCatchment) {
      const [m, l] = key.split('|');
      if (m === model && Number(l) === lead) values.push(mean(xs));
    }
    if (!values.length) throw new Error(`no rows for ${model} at ${lead} days`);
    values.sort((a, b) => a - b);
    return {
      id: model,
      catchments: values.length,
      p10: round(quantile(values, 0.10), 3),
      p25: round(quantile(values, 0.25), 3),
      p50: round(quantile(values, 0.50), 3),
      p75: round(quantile(values, 0.75), 3),
      p90: round(quantile(values, 0.90), 3),
      below_zero_pct: round(100 * values.filter(v => v < 0).length / values.length, 1),
      // Text forms keep trailing zeros, which Liquid would drop.
      text: {
        p25: quantile(values, 0.25).toFixed(3),
        p50: quantile(values, 0.50).toFixed(3),
        p75: quantile(values, 0.75).toFixed(3),
      },
    };
  }),
}));

const fresh = { source: SOURCE, metric: 'NSE, test years (water years 2013 to 2022)', skill };

if (flag === '--write') {
  fs.writeFileSync(OUT, JSON.stringify(fresh, null, 2) + '\n');
  console.log(`wrote ${path.relative(process.cwd(), OUT)}`);
  process.exit(0);
}

const published = JSON.parse(fs.readFileSync(OUT, 'utf8'));
if (JSON.stringify(published) === JSON.stringify(fresh)) {
  console.log('research numbers match the study results');
} else {
  console.error(`${path.relative(process.cwd(), OUT)} differs from ${SOURCE}. Re-run with --write and review the diff.`);
  process.exit(1);
}
