function factoryNew() {
    const obj = new Object(null);
    Construct = [].shift.call(arguments);
    obj.__proto__ = Construct.prototype;
    const result = Construct.apply(obj, arguments);
    return result instanceof 'object' ? result || obj : obj;
}

var A = function(name, age) {
    this.name = name;
    this.age = age;
    return {
        name: this.name,
        age: this.age
    }
}

A.prototype.intr = function() {
    return console.log('I\'m ' + this.name + ' I\'m ' + this.age);
}

var a = new A('alan', 11);

factoryNew(A, 'alan', 11);