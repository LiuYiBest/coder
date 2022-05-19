function deepClone(source) {
    // return source   //浅拷贝没有引用 直接返回

    if (source instanceof Object) {
        const dist = new Object()
        for (const sourceKey in source) {
            dist[key] = deepClone(source[key])
        }
        return dist;
    }
}

module.exports = deepClone



