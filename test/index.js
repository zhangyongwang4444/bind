const bind = require("../src/index")

test1("fn.bind 能用")
test2("this 绑定能用")
test3("this,p1,p2 绑定成功")
test4("this,p1绑定成功，后传p2调用成功")
test5("new 的时候 绑定了p1 p2")
test6("new 的时候 绑定了p1 p2,并且fn 有 prototype.sayHi")
test7("不用new 但是用类似的对象")

function test1(message) {
    Function.prototype.bind2 = bind
    console.assert(Function.prototype.bind2 !== undefined)
    console.log(message)
}

function test2(message) {
    Function.prototype.bind2 = bind
    const fn1 = function () { return this }
    const newFn1 = fn1.bind2({ name: 'frank' })
    console.assert(newFn1().name === 'frank')
    console.log(message)
}

function test3(message) {
    Function.prototype.bind2 = bind
    const fn2 = function (p1, p2) { return [this, p1, p2] }
    const newFn2 = fn2.bind2({ name: 'frank' }, 123, 456)
    console.assert(newFn2()[0].name === 'frank', "this")
    console.assert(newFn2()[1] === 123, "p1")
    console.assert(newFn2()[2] === 456, "p2")
    console.log(message)
}

function test4(message) {
    Function.prototype.bind2 = bind
    const fn2 = function (p1, p2) { return [this, p1, p2] }
    const anotherFn2 = fn2.bind2({ name: 'frank' }, 444)
    console.assert(anotherFn2(245)[0].name === 'frank', "this")
    console.assert(anotherFn2(245)[1] === 444, "p1")
    console.assert(anotherFn2(245)[2] === 245, "p22")
    console.log(message)
}

function test5(message) {
    Function.prototype.bind2 = bind
    const fn = function (p1, p2) {
        this.p1 = p1
        this.p2 = p2
    }
    const fn2 = fn.bind2(undefined, "x", "y")
    const object = new fn2()
    console.log(object)
    console.assert(object.p1 === "x", "x")
    console.assert(object.p2 === "y", "y")
    console.log(message)
}

function test6(message) {
    Function.prototype.bind2 = bind
    const fn = function (p1, p2) {
        this.p1 = p1
        this.p2 = p2
    }
    fn.prototype.sayHi = function () { }
    const fn2 = fn.bind2(undefined, "x", "y")
    const object = new fn2()
    console.log(object)
    console.assert(object.p1 === "x", "x")
    console.assert(object.p2 === "y", "y")
    // console.assert(object.__proto__ === fn.prototype, "pro")
    console.assert(fn.prototype.isPrototypeOf(object))
    console.assert(typeof object.sayHi === 'function', "sayHi")
    console.log(message)
}

function test7(message) {
    Function.prototype.bind2 = bind
    const fn = function (p1, p2) {
        this.p1 = p1
        this.p2 = p2
    }
    fn.prototype.sayHi = function () { }
    const object1 = new fn("a", "b")
    const fn2 = fn.bind2(object1, "x", "y")
    const object = fn2() // 没有用 new 
    console.assert(object === undefined, "object 为空")
    console.assert(object1.p1 === "x", "x")
    console.assert(object1.p2 === "y", "y")
    console.log(message)
}