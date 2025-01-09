function renderer(vnode, container) {
    if (typeof vnode.tag === 'string') {
        mountElement(vnode, container);
    } else if (typeof vnode.tag === 'function') {
        mountComponent(vnode, container);
    }
}
function mountElement(vnode, container) {
    const el = document.createElement(vnode.tag);
    for (const key in vnode.attrs) {
        if (/^on/.test(key)) {
            el.addEventListener(key.substring(2).toLowerCase(), vnode.attrs[key]);
        }
    }

    if (typeof vnode.children === 'string') {
        el.appendChild(document.createTextNode(vnode.children));
    } else if (Array.isArray(vnode.children)) {
        vnode.children.forEach((child) => renderer(child, el));
    }

    container.appendChild(el);
}



function mountComponent(vnode, container) {
    const subtree = vnode.tag()
    renderer(subtree, container);
}




const MyComponent = () => ({
    tag: 'button',
    attrs: {
        onClick: () => alert('hello')
    },
    children: 'click mexxx'
});


const vnode = {
    tag: MyComponent,
}

renderer(vnode, document.body);