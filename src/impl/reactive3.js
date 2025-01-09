
let activeEffect
const bucket = new WeakMap()




const data = {
    text: 'hello'
}


const obj = new Proxy(data, {
    get(target, key) {
        if (!activeEffect) return target[key]

        let depsMap = bucket.get(target)
        if (!depsMap) {
            depsMap = new Map()
            bucket.set(target, depsMap)
        }

        let deps = depsMap.get(key)
        if (!deps) {
            deps = new Set()
            depsMap.set(key, deps)
        }

        deps.add(activeEffect)

        return target[key]
    },
    set(target, key, newV) {
        target[key] = newV
        bucket.forEach(fn => fn())
        return true
    }
})


function effect(fn) {
    activeEffect = fn
    fn()
}

effect(() => {
    console.log('effect run');

    document.body.innerText = obj.text
})

setTimeout(() => {
    // obj.text = 'world'
    obj.notExist = 'world'
}, 1000)