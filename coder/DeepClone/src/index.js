let cache = [] //循环栈

function deepClone(source) {

    if (source instanceof Object) {
        //是否在缓存
        if (cache.indexOf(source) >= 0) {
            return source
        } else {
            cache.push(source)
        }
        let dist
        //判断是否是数组
        if (source instanceof Array) {
            dist = new Array();

        } else if (source instanceof Function) {
            dist = function () {
                return source.apply(this, arguments);
            }
        } else {
            dist = new Object()
        }
        for (const sourceKey in source) {
            //递归循环
            dist[sourceKey] = deepClone(source[sourceKey])
        }
        return dist;
    }
    return source   //浅拷贝没有引用 直接返回
}

module.exports = deepClone



