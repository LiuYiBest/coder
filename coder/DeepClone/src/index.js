function deepClone(source) {
    // return source   //浅拷贝没有引用 直接返回

    if (source instanceof Object) {
        //判断是否是数组
        if (source instanceof Array) {
            const dist = new Array();
            for (const sourceKey in source) {
                //递归虚幻
                dist[key] = deepClone(source[key])
            }
        } else {
            const dist = new Object()
            for (const sourceKey in source) {
                //递归循环
                dist[key] = deepClone(source[key])
            }
        }
        return dist;
    }
}

module.exports = deepClone



