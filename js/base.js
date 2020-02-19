var tools = {
    /**
     * 继承
     * @param {*} target 目标对象 
     * @param {*} origin 源对象
     */
    inherit: function (target, origin) {
        var F = function () {};
        F.prototype = origin.prototype;
        target.prototype = new F();
        target.prototype.constructor = target;
    },
    /**
     * 扩展
     * @param {*} origin 
     */
    extends: function (origin) {
        var target = function () {
            origin.apply(this, arguments);
            // return this;
        }
        this.inherit(target, origin);
        return target;
    },
    /**
     * 单例
     * @param {*} origin 
     */
    single: function (origin) {
        var singleResult = (function () {
            var instance;
            return function () {
                if (typeof (instance) == 'object') return instance;
                origin && origin.apply(this, arguments);
                instance = this;
            }
        })();
        origin && this.inherit(singleResult, origin);
        return singleResult;
    }
}

// function Squire(x, y, width, height) {
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
// }
// Squire.prototype.collit = function () {
//     console.log('collit');
// }

// var F = tools.single(Squire);
// var f1 = new F(10, 20, 30, 40);
// var f2 = new F(10, 20, 30, 40);
// console.log(f1 == f2)

// var F = tools.extends(Squire);
// var f = new F(10, 20, 30, 40);
// console.log(f.collit())
// console.log(f.x, f.y, f.width, f.height);

// function F() {}
// tools.inherit(F, Squire);
// var f = new F();
// console.log(f.collit())