import "@types/node";

class Promise2 {

    // succeed = null
    // fail = null
    state = "pending"
    callbacks = []
    resolve = (result) => {
        setImmediate(() => {
            if (this.state !== 'pending') {
                return;
            }
            this.state = "fulfilled"
            this.callbacks.forEach((handle) => {
                if (typeof handle[0] === "function") {
                    const x = handle[0].call(undefined, result)
                    handle[2].resolveWith(x)
                }
            })
        },)
    }
    reject = (reason) => {
        setImmediate(() => {
            //遍历callbacks 调用所有的handle[1]
            if (this.state !== 'pending') {
                return;
            }
            this.state = "rejected"
            this.callbacks.forEach((handle) => {
                if (typeof handle[1] === "function") {
                    const x = handle[1].call(undefined, reason)
                    handle.resolveWith(x)
                }
            })
        })
    }

    constructor(fn) {
        if (typeof fn !== "function") {
            throw  new Error("只接受函数")
        }
        //给fn函数传递两个函数参数,resolve和reject
        fn(this.resolve.bind(this), this.reject.bind(this));
    }

    then(succeed?, fail?) {
        const handle = [];

        if (typeof succeed === "function") {
            handle[0] = succeed;
        }
        if (typeof succeed === "function") {
            handle[1] = fail;
        }
        if (typeof succeed === 'function' || typeof fail === "function") {
            handle[2] = new Promise2(() => {
            })

        }
        this.callbacks.push(handle)
    }

    resolveWith(x) {
        // this是调用的promise2
        if (this === x) {
            this.reject(new TypeError('promise resolve'))
        }
        if (x instanceof Promise2) {
            x.then(result => {
                    this.resolve(result)
                }, reason => {
                    this.reject(reason)
                }
            )
        }
        // 如果x.then存在则调用
        if (x instanceof Object) {
            let then
            try {
                let then = x.then()
            } catch (e) {
                this.reject(e)
            }
            if (then instanceof Function) {
                then.call(x)
                try {
                    x.then((y) => {
                        this.resolveWith(y)
                    }, (r) => {
                        this.reject(r)
                    })
                } catch (e) {
                    this.reject(e)
                }
            } else {
                this.resolve(x)
            }
        }
    }
}

export default Promise2



