const { Observable } = require("object-observer");
const { clone } = require(".");
const now = require("performance-now");

class Step {
  async fn() {} // Should be overridden by child classes

  async run(context, audit) {
    if (!context) throw new Error("context object is required!");
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
    await this.fn(context);
    const end = now();
    Observable.unobserve(context, observer);

    audit.steps.push({
      rule: this.constructor.name,
      fn: this.fn,
      contextChangesHistory: stepChangeHistory,
      contextDiff: {}, // TODO: Implement
      timing: end - start,
    });
  }
}

module.exports = Step;
