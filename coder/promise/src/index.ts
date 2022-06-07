class Promise2 {
    succeed = null
    fail = null
    state = "pending"
    resolve = () => {
        setTimeout(() => {
            if(typeof this.succeed ==="function"){
                this.succeed()
            }
        }, 0)
    }
    reject = () => {
        setTimeout(() => {
            if(typeof this.fail ==="function"){
                this.fail()
            }
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
        if(typeof  succeed ==="function"){
            this.succeed = succeed;
        }
        if(typeof  succeed ==="function"){
            this.fail = fail;
        }
    }
}

export default Promise2



