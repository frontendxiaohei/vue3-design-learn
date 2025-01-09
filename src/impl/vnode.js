function renderer(vnode, container) {
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


const vnode = {
    tag: 'button',
    attrs: {
        onClick: () => alert('hello')
    },
    children: 'click me'
}

renderer(vnode, document.body);