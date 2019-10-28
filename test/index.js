const bind = require("../src/index")
Function.prototype.bind2 = bind
console.assert(Function.prototype.bind2 !== undefined)

const fn1 = function () {
    return this
}
const newFn1 = fn1.bind2({ name: 'frank' })
console.assert(newFn1().name === 'frank')


const fn2 = function (p1, p2) {
    return [this, p1, p2]
}
const newFn2 = fn2.bind2({ name: 'frank' }, 123, 456)
console.assert(newFn2()[0].name === 'frank', "this")
console.assert(newFn2()[1] === 123, "p1")
console.assert(newFn2()[2] === 456, "p2")

const anotherFn2 = fn2.bind2({ name: 'frank' }, 444)
console.assert(anotherFn2(245)[0].name === 'frank',"this")
console.assert(anotherFn2(245)[1] === 444,"p1")
console.assert(anotherFn2(245)[2] === 245,"p22")