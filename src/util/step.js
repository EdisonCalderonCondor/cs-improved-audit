const { Observable } = require("object-observer");
const { diff } = require("deep-diff");
const { clone } = require(".");
const now = require("performance-now");

class Step {
  fn() {} // Should be overridden by child classes

  run(context, audit) {
    if (!context) throw new Error("context object is required!");
    const sharedState = { context, audit, caller: this };

    runPreExecuteTasks(sharedState);
    const timingStart = now();
    this.fn(context);
    runPostExecuteTasks(sharedState);
    const timingEnd = now();
    Object.assign(sharedState, { timingStart, timingEnd });
    saveAuditRecord(sharedState);
  }
}

const runPreExecuteTasks = (sharedState) => {
  const { audit, context } = sharedState;
  const { trackContextDiff, trackContextChangesHistory } = audit.config;

  const stepChangeHistory = [];
  let currentContext, observer;

  if (trackContextDiff) currentContext = clone(context);

  if (trackContextChangesHistory) {
    observer = (changes) => {
      changes.forEach((change) => {
        const { type, path, value, oldValue } = change;
        stepChangeHistory.push(clone({ type, path, value, oldValue }));
      });
    };
    Observable.observe(context, observer);
  }
  Object.assign(sharedState, { currentContext, observer, stepChangeHistory });
};

const runPostExecuteTasks = (sharedState) => {
  const { context, audit, observer } = sharedState;
  const { trackContextChangesHistory } = audit.config;
  if (trackContextChangesHistory) Observable.unobserve(context, observer);
};

const saveAuditRecord = (sharedState) => {
  const {
    audit,
    caller,
    timingStart,
    timingEnd,
    stepChangeHistory,
    currentContext,
    context,
  } = sharedState;
  const { trackTiming, trackContextChangesHistory, trackContextDiff } =
    audit.config;

  const auditRecord = {
    rule: caller.constructor.name,
    fn: caller.fn,
  };

  if (trackTiming)
    Object.assign(auditRecord, { timing: timingEnd - timingStart });
  if (trackContextChangesHistory)
    Object.assign(auditRecord, { stepChangeHistory });
  if (trackContextDiff)
    Object.assign(auditRecord, {
      contextDiff: diff(currentContext, clone(context)) || [],
    });

  audit.callStack.push(auditRecord);
};

module.exports = Step;
