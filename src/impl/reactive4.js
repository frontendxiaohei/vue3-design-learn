
let activeEffect
const bucket = new WeakMap()




const data = {
    ok: true,
    text: 'hello'
}


const obj = new Proxy(data, {
    get(target, key) {
        

        track(target, key)
        return target[key]
    },
    set(target, key, newV) {
        target[key] = newV
        trigger(target, key)
        return true
    }
})

function track(target, key) {
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

    activeEffect.deps.push(deps)

    console.log(depsMap);
    
}

function trigger(target, key) {
    let depsMap = bucket.get(target)
    if (!depsMap) return

    let deps = depsMap.get(key)
    if (!deps) return

    deps.forEach(fn => fn())
}


function effect(fn) {
    const effectFn = () => {
        activeEffect = effectFn
        fn()
    }
    effectFn.deps = []

    effectFn()
}

effect(() => {
    console.log('effect run');

    document.body.innerText = obj.ok ? obj.text : ''
})

setTimeout(() => {
    obj.text = 'world'
    // obj.notExist = 'world'
}, 1000)