class Promise {
    callbacks = []
    constructor(fn) {
        fn(this._resolve.bind(this))
    }
    then(onFullfilled) {
        this.callbacks.push(onFullfilled)
    }
    _resolve(value) {
        this.callbacks.forEach(fn => fn(value))
    }
}

//Promise应用
let p = new Promise(resolve => {
    setTimeout(() => {
        console.log('done');
        resolve('5秒');
    }, 5000);
}).then((tip) => {
    console.log(tip);
})