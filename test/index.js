const bind = require("../src/index")

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

test1("fn.bind 能用")
test2("this 绑定能用")
test3("this,p1,p2 绑定成功")
test4("this,p1绑定成功，后传p2调用成功")
