
const bucket = new Set()


const data = {
    text: 'hello'
}


const obj = new Proxy(data, {
    get(target, key) {
        bucket.add(effect)
        return target[key]
    },
    set(target, key, newV) {
        target[key] = newV
        bucket.forEach(fn => fn())
        return true
    }
})


function effect() {
    document.body.innerText = obj.text
}

effect()

setTimeout(() => {
    obj.text = 'world'
}, 1000)