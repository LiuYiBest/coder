import * as chai from "chai";

const assert = chai.assert
import Promise from "../src/index";

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
        let called = false;
        const promise = new Promise(() => {
            called = true
        })
        // @ts-ignore
        assert(called === true)
    })
    it('new Promise(fn)中的fn执行的时候接受resolve和reject函数', () => {
        let called = false;
        const promise = new Promise(() => {
            called = true
            let resolve;
            assert.isFunction(resolve)
            let rejcet;
            assert.isFunction(rejcet)
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

})

