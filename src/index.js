(async () => {
  const { getContext } = require("./context");
  const { Rule1, Rule2, Rule3 } = require("./rules");

  const audit = { steps: [] };
  const context = getContext();

  const r1 = new Rule1(context, audit);
  const r2 = new Rule2(context, audit);
  const r3 = new Rule3(context, audit);

  await r1.run();
  await r2.run();
  await r3.run();

  console.dir(audit, { depth: null });
  console.table(audit.steps[2].contextChangesHistory);
})();
