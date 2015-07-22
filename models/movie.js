var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var movieSchema = new Schema({
  title: String,
  releaseYear: String,
  director: String,
  genre: String
});

var movie = mongoose.model('Movie', movieSchema);

movie.getByYear = function(year, done){
  movie.find({'releaseYear': year}, function(err, movies){
    if (err) {
      return res.send(err);
    }
    done(movies);
  });
};

module.exports = movie;
