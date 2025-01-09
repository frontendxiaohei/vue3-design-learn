const map = new Map();

const weakMap = new WeakMap();

(function () {
    const foo = {}
    const bar = {}

    map.set(foo, 'foo')
    weakMap.set(bar, 'bar')
})();