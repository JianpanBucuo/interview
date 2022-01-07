const asyncHooks = require('async_hooks');
const { executionAsyncId } = asyncHooks;
const fs = require('fs')
class AsyncLocalStorage {
  constructor() {
    this.storeMap = new Map(); // {1}
    this.createHook(); // {2}
  }
  createHook() {
    const ctx = this;
    const hooks = asyncHooks.createHook({
      init(asyncId, type, triggerAsyncId) {
                         
        if (ctx.storeMap.has(triggerAsyncId)) {
          ctx.storeMap.set(asyncId, ctx.storeMap.get(triggerAsyncId));
        }
      },
      destroy(asyncId) {
        ctx.storeMap.delete(asyncId);
      }
    });
    hooks.enable();
  }
  run(store, callback) { // {3}
    this.storeMap.set(executionAsyncId(), store);
    callback();
  }
  getStore() { // {4}
    return this.storeMap.get(executionAsyncId());
  }
}
module.exports = AsyncLocalStorage;
