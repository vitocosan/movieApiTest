var Movie = require('../models/movie');
var MovieBus = require('../business/movie_business');
var MovieAccion = require('../business/accion');
var express = require('express');
var router = express.Router();

router.route('/movieBus').post(function(req, res) {
  var mov = new MovieBus();
  mov.set_name('King Kong');
  mov.set_releaseDate('12-12-15');
  mov.saveMovie(res);
});

router.route('/movieAccion').post(function(req, res) {
  var accion = new MovieAccion('Terminator');
  accion.set_name('Pelicula');
  accion.saveMovie(res);
});


router.route('/movies').get(function(req, res) {
  Movie.find(function(err, movies) {
    if (err) {
      return res.send(err);
    }

    res.json(movies);
  });
});

router.route('/movies/:year').get(function(req, res) {
  var year = req.params.year;
  var mov = new MovieBus();
  mov.getMovie(res,year);
});


router.route('/movies').post(function(req, res) {
  var movie = new Movie(req.body);

  movie.save(function(err) {
    if (err) {
      return res.send(err);
    }

    res.send({ message: 'Movie Added' });
  });
});


router.route('/movies')
  .get(function(req, res) {
    Movie.find(function(err, movies) {
      if (err) {
        return res.send(err);
      }

      res.json(movies);
    });
  })
  .post(function(req, res) {
    var movie = new Movie(req.body);

    movie.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.send({ message: 'Movie Added' });
    });
  });

router.route('/movies/:id').put(function(req,res){
  Movie.findOne({ _id: req.params.id }, function(err, movie) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      movie[prop] = req.body[prop];
    }

    // save the movie
    movie.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({ message: 'Movie updated!' });
    });
  });
});


router.route('/movies/:id').get(function(req, res) {
  Movie.findOne({ _id: req.params.id}, function(err, movie) {
    if (err) {
      return res.send(err);
    }

    res.json(movie);
  });
});


router.route('/movies/:id').delete(function(req, res) {
  Movie.remove({
    _id: req.params.id
  }, function(err, movie) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Successfully deleted' });
  });
});


module.exports = router;
