import * as chai from "chai";
import * as sinon from "sinon"
import * as sinonChai from "sinon-chai";


chai.use(sinonChai)

const assert = chai.assert
import Promise from "../src/index";
import Promise2 from "../src/index";

describe('Promise', () => {
    it("是一个类", () => {
        // 单元测试
        // @ts-ignore
        assert(typeof Promise === "function")
        // @ts-ignore
        assert(typeof Promise.prototype === "Object")
    });
    // @ts-ignore
    it("new Promise()必须接受一个函数", () => {
        //new Promise会报错
        throw assert(() => {
            // @ts-ignore
            new Promise()
        })
        assert.throw(() => {
            // @ts-ignore
            new Promise(1)
        })
    });
    it("new Promise(fn)会生成一个对象，对象有then方法", () => {
        const promise = new Promise(() => {
        })
        assert.isFunction(promise.then)
    })
    it('new Promise(fn)中的fn立即执行', () => {
        let fn = sinon.fake()
        const promise = new Promise(fn)
        // @ts-ignore
        assert(fn.called)
    })
    it('new Promise(fn)中的fn执行的时候接受resolve和reject函数', (done) => {
        let called = false;
        const promise = new Promise(() => {
            called = true
            let resolve;
            assert.isFunction(resolve)
            let rejcet;
            assert.isFunction(rejcet)
            done()
        })
        // @ts-ignore
        assert(called === true)
    })
    it('promise.then(success)的success会在resolve被调用的时候执行', (done) => {
        let called = false
        const promise = new Promise((resolve, reject) => {
            // @ts-ignore
            assert(called === false)
            resolve();
            // @ts-ignore
            assert(called === true)
            done()
        })
        // @ts-ignore
        promise.then(() => {
            called = true
        })
    })
    it('2.2.1then后面不是函数', (done) => {
        const promise = new Promise((resolve) => {
            resolve()
        });
        promise.then(false, null)
    })
    it('2.2.2函数必须在fulfilled之后执行', (done) => {
        const succeed = sinon.fake()
        const promise = new Promise((resolve) => {
            assert.isFalse(succeed.called)
            setTimeout(() => {
                assert.isTrue(succeed.calledOnce)
                // @ts-ignore
                assert(promise.state === "pending");
                done()
            })
        });
        promise.then(succeed)
    })
    it('2.2.3代码执行完之前不得调用then之前的函数', (done) => {
        const succeed = sinon.fake()
        const promise = new Promise((resolve) => {
            resolve()
        });
        promise.then(succeed)
        assert.isFalse(succeed.called)
        setTimeout(() => {
            assert.isFalse(succeed.called)
            done()
        })
    })
    it('2.2.4失败回调', (done) => {
        const reject = sinon.fake()
        const promise = new Promise((reject) => {
            reject()
        });
        promise.then(reject)
        assert.isFalse(reject.called)
        setTimeout(() => {
            assert.isFalse(reject.called)
            done()
        })
    })
    it('2.2.5函数的this是undefined', (done) => {
        const promise = new Promise((resolve) => {
            resolve()
        });
        promise.then(function () {
            // @ts-ignore
            assert(this === undefined)
        })
    })

    it('2.2.6函数的then可以调用多次', (done) => {
        const promise = new Promise((resolve) => {
            resolve()
        });
        const callbaks = [sinon.fake(), sinon.fake()]
        promise.then(callbaks[0])
        promise.then(callbaks[1])
        setTimeout(() => {
            // @ts-ignore
            assert(callbaks[0].called)
            // @ts-ignore
            assert(callbaks[0].calledAfter(callbaks[1]))
            // @ts-ignore
            assert(callbaks[1].called)
        })
    })
    it('2.2.7then必须返回一个promise', (done) => {
        const promise = new Promise((resolve) => {
            resolve()
        });
        const promise2 = promise.then(() => {
        }, () => {
        });
        // @ts-ignore
        assert(promise2 instanceof Promise)
    })

    it('2.2.7如果then(success,fail)的succee返回一个值x，运行[[Resolve]]（promise2,x）', (done) => {
        const promise = new Promise((resolve) => {
            resolve()
        });
        const promise2 = promise.then(() => {
        }, () => {
        })
        let fn = sinon.fake()
        promise.then(()=>"成功",()=>{})
        // @ts-ignore
        assert(promise2 instanceof Promise)
        setTimeout(()=>{
            console.assert(fn.called)
            done()
        })
    })
})

