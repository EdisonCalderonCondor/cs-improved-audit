const { getContext } = require("./context");
const { Rule1, Rule2, Rule3, Rule4, Rule5 } = require("./rules");

const audit = {
  callStack: [],
  config: {
    trackTiming: true,
    trackContextChangesHistory: true,
    trackContextDiff: true,
  },
};
const context = getContext();

const r1 = new Rule1(); // Only should be instantiated once
const r2 = new Rule2(); // Only should be instantiated once
const r3 = new Rule3(); // Only should be instantiated once
const r4 = new Rule4(); // Only should be instantiated once
const r5 = new Rule5(); // Only should be instantiated once

r1.run(context, audit);
r2.run(context, audit);
r3.run(context, audit);
r4.run(context, audit);
r5.run(context, audit);

console.dir(audit, { depth: null });
// console.table(audit.callStack[2].contextChangesHistory);
