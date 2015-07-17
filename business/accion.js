//Ejemplo de clase hija
var BaseClass = require('./movie_business');
var Inherit = require('./inherit');

var AccionMovie = (function () {
    // constructor
    var cls = function (movieName) {
        // Call super constructor on this instance (any arguments
        // to the constructor would go after "this" in call(…)).
        this.constructor.super.call(this);

        // Shadowing instance properties is a little bit less
        // intuitive, but can be done:
        var getName = this.get_name;

        // public (this instance only)
        this.get_name = function () {
            return getName.call(this) + ' ' + movieName;
        };
    };
    Inherit(cls, BaseClass); // <-- important!

    return cls;
})();


module.exports = AccionMovie;
