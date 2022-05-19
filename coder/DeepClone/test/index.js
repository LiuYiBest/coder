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
        const n = 123;
        const n2 = deepClone(n)
        assert(n===n2)
    })
})
