var slice = Array.prototype.slice;
function bind(asThis) {
    // this 就是函数
    var args = slice.call(arguments, 1)
    var fn = this
    if (typeof fn !== 'function') {
        throw new Error('bind 必须用在函数身上');
    }
    return function () {
        var args2 = slice.call(arguments, 0)
        return fn.apply(asThis, args.concat(args2))
    }
}

function _bind(asThis, ...args) {
    // this 就是函数
    const fn = this
    function resultFn(...args2) {
        // this // new 生成的
        // this.__proto__ = resultFn.prototype
        // this.p1 = 'x'
        // this.p2 = 'y'
        // return this // 没了
        return fn.call(this.__proto__ === resultFn.prototype ? this : asThis, ...args, ...args2)
    }
    resultFn.prototype = fn.prototype
    return resultFn
}

module.exports = _bind

if (!Function.prototype.bind) {
    Function.prototype.bind = _bind
}

