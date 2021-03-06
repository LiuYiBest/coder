const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const assert = chai.assert
const deepClone = require("../src/index")

describe('deepClone赋值', () => {
    //声明下deepClone是个函数
    it("是一个深拷贝函数", () => {
        // assert.isFunction(deepClone)
    })
    //测试用例
    it('能够复制基本类型', () => {
        //基本类型没有引用
        const a = 123;
        const a2 = deepClone(a)
        assert(a === a2)
        const s = "123456"
        const s2 = deepClone(s)
        assert(s === s2)
        const t = true
        const t2 = deepClone(t)
        assert(t === t2)
        const u = undefined
        const u2 = deepClone(u)
        assert(u === u2)
        const n = null
        const n2 = deepClone(n)
        assert(n === n2)
    })

//    复制对象
    describe("拷贝对象", () => {
        it("复制普通对象", () => {
            const a = {name: "张三", child: {name: "张小小"}}
            const a2 = deepClone(a);
            assert(a !== a2)
            assert(a.name === a2.name)
            assert(a.child !== a2.child)
            assert(a.child.name === a2.child.name)
        })
        it("复制数组对象", () => {
            const a = [[11, 12], [21, 21], [31, 32]]
            const a2 = deepClone(a);
            assert(a !== a2)
            assert(a[0] !== a2[0])
            assert(a[1] !== a2[1])
            assert(a[2] !== a2[2])
            assert.deepEqual(a, a2)
        })
        it("复制函数对象", () => {
            const a = function (x, y) {
                return x + y
            }
            a.xxx = {yyy: {zzz: 1}}
            const a2 = deepClone(a)
            assert(a !== a2)
            assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz)
            assert(a.xxx.yyy !== a2.xxx.yyy)
            assert(a.xxx !== a2.xxx)
            assert(a(1, 2) === a2(1, 2))
        })
        it("环检测，环可以用复制", () => {
            const a = {name: '小'};
            a.self = a
            const a2 = deepClone(a)
            assert(a === a2)
        })
        it("不会爆栈", () => {
            const a = {child: null}
            let b = a
            for (let i = 0; i < 20000; i++) {
                b.child = {
                    child: null
                }
                b = b.child
            }
        })
        it("日期Data", () => {
            const a = {child: null}
        })
        it("正在表达式", () => {
            const a = {child: null}
        })
    })
})
