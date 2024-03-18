
const { table, op, desc, all } = aq;

const dt = table({
    'Seattle': [69, 108, 178, 207, 253, 268, 312, 281, 221, 142, 72, 52],
    'Chicago': [135, 136, 187, 215, 281, 311, 318, 283, 226, 193, 113, 106],
    'San Francisco': [165, 182, 251, 281, 314, 330, 300, 272, 267, 243, 189, 156]
});

console.log(dt);

dt.derive({
    month: d => op.row_number(),
    diff:  d => d.Seattle - d.Chicago
  })
  .select('month', 'diff')
  .orderby(desc('diff'))
  .print();

const dt_jsformat = table({
    'Seattle': [69, 108, 178, 207, 253, 268, 312, 281, 221, 142, 72, 52],
    'Chicago': [135, 136, 187, 215, 281, 311, 318, 283, 226, 193, 113, 106],
    'San Francisco': [165, 182, 251, 281, 314, 330, 300, 272, 267, 243, 189, 156]
}).objects();

console.log(dt_jsformat);

const aggregateStats = dt.fold(all(), { as: ['city', 'sun'] })
    .groupby('city')
    .rollup({
        min: d => op.min(d.sun), 
        max: d => op.max(d.sun),
        avg: d => op.average(d.sun),
        med: d => op.median(d.sun),
        skew: ({ sun: s }) => (op.mean(s) - op.median(s)) / op.stdev(s) || 0
    })
    .objects();

    console.log(aggregateStats);

