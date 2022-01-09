const http = require('http')
const { AsyncLocalStorage } = require('async_hooks')
const asyncLocalStorage = new AsyncLocalStorage()

function logWithId (msg) {
  const {id} = asyncLocalStorage.getStore()
  console.log(`${id !== undefined ? id : '-'}:`, msg);
}