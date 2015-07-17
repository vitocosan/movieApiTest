var Movie = require('../models/movie');

var MovieBusiness = (function () {
    // private static
    var nextId = 1;

    // constructor
    var cls = function () {
        // private
        var _id = nextId++;
        var _name = 'Unknown';
        var _type = 'Unknown';
        var _releaseDate = 'Unknown';

        // public (this instance only)
        this.get_id = function () { return _id; };
        this.get_name = function () { return _name; };
        this.get_type = function () { return _type; };
        this.get_releaseDate = function () { return _releaseDate; };

        this.set_name = function (value) {
            if (typeof value != 'string')
                throw 'Name must be a string';
            if (value.length < 2 || value.length > 20)
                throw 'Name must be 2-20 characters long.';
            _name = value;
        };

        this.set_type = function(value){
          if (typeof value != 'string')
              throw 'Type must be a string';
          _type = value;
        };

        this.set_releaseDate = function(value){
          _releaseDate = value;
        };

    };

    // public static
    cls.get_nextId = function () {
        return nextId;
    };

    // public (shared across instances)
    cls.prototype = {
        announce: function () {
            console.log('Hi there! My id is ' + this.get_id() + ' and my name is "' + this.get_name() + '"!\r\n' +
                  'The next fellow\'s id will be ' + MovieBusiness.get_nextId() + '!');
        },
        changeName: function(value){
            this.set_name(value);
        },
        saveMovie: function(res){
          var movie = new Movie({ "title": this.get_name(), "releaseYear": this.get_releaseDate(), "director": "Unknow", "genre": this.get_type() });
          movie.save(function(err) {
            if (err) {
              return res.send(err);
            }
            res.send({ message: 'Movie Added' });
          });
        }
    };

    return cls;
})();

module.exports = MovieBusiness;
