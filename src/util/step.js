const { Observable } = require("object-observer");
const { diff } = require("deep-diff");
const { clone } = require(".");
const now = require("performance-now");

class Step {
  fn() {} // Should be overridden by child classes

  run(context, audit) {
    if (!context) throw new Error("context object is required!");
    const currentContext = clone(context);
    const stepChangeHistory = [];
    const observer = (changes) => {
      changes.forEach((change) => {
        const { type, path, value, oldValue } = change;
        stepChangeHistory.push(clone({ type, path, value, oldValue }));
      });
    };
    // TODO: Based on configuration enable audit capabilities
    Observable.observe(context, observer);
    const start = now();
    this.fn(context);
    const end = now();
    Observable.unobserve(context, observer);

    audit.steps.push({
      rule: this.constructor.name,
      fn: this.fn,
      contextChangesHistory: stepChangeHistory,
      contextDiff: diff(currentContext, clone(context)) || [],
      timing: end - start,
    });
  }
}

module.exports = Step;
