function deepClone(source) {

    if (source instanceof Object) {
        //判断是否是数组
        if (source instanceof Array) {
            const dist = new Array();
            for (const sourceKey in source) {
                //递归虚幻
                dist[sourceKey] = deepClone(source[sourceKey])
            }
            return dist;
        } else if (source instanceof Function) {
            const dist = function (){
                return source.apply(this,arguments);
            }
            for (const sourceKey in source) {
                //递归循环
                dist[sourceKey] = deepClone(source[sourceKey])
            }
            return dist
        } else {
            const dist = new Object()
            for (const sourceKey in source) {
                //递归循环
                dist[sourceKey] = deepClone(source[sourceKey])
            }
            return dist;
        }
    }
    return source   //浅拷贝没有引用 直接返回
}

module.exports = deepClone



