const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const assert = chai.assert
const deepClone = require("../src/index")

describe('deepClone赋值',()=>{
    //声明下deepClone是个函数
    it("是一个深拷贝函数",()=>{
        // assert.isFunction(deepClone)
    })
    //测试用例
    it('能够复制基本类型',()=>{
        //基本类型没有引用
        const a = 123;
        const a2 = deepClone(n)
        assert(a===a2)
        const s = "123456"
        const s2 = deepClone(s)
        assert(s===s2)
        const t = true
        const t2 = deepClone(t)
        assert(t===t2)
        const u = undefined
        const u2 = deepClone(u)
        assert(u===u2)
        const n = null
        const n2 = deepClone(n)
        assert(n===n2)
    })
})
