(async () => {
  const { getContext } = require("./context");
  const { Rule1, Rule2, Rule3 } = require("./rules");

  const audit = { steps: [] };
  const context = getContext();

  const r1 = new Rule1(); // Only should be instantiated once
  const r2 = new Rule2(); // Only should be instantiated once
  const r3 = new Rule3(); // Only should be instantiated once

  await r1.run(context, audit);
  await r2.run(context, audit);
  await r3.run(context, audit);

  console.dir(audit, { depth: null });
  console.table(audit.steps[2].contextChangesHistory);
})();
