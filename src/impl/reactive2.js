
let activeEffect
const bucket = new Set()




const data = {
    text: 'hello'
}


const obj = new Proxy(data, {
    get(target, key) {
        if (activeEffect) {
            bucket.add(activeEffect)
        }
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