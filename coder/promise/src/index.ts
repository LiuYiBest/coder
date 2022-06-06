class Promise2 {
    succeed = null
    fail = null

    resolve = () => {
        setTimeout(() => {
            this.succeed()
        }, 0)
    }
    reject = () => {
        setTimeout(() => {
            this.fail()
        })
    }

    constructor(fn) {
        if (typeof fn !== "function") {
            throw  new Error("只接受函数")
        }
        //给fn函数传递两个函数参数,resolve和reject
        fn(this.resolve.bind(this), this.reject.bind(this));
    }

    then(succeed, fail) {
        this.succeed = succeed;
        this.fail = fail;
    }
}

export default Promise2



