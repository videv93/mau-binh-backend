var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

var userSchema = new mongoose.Schema({name: String});

var User = mongoose.model('User', userSchema);

myUserFunction(User);

function myUserFunction(User) {
  User.create({name : 'John'}, function(error, doc) {
    // console.log(require('util').inspect(doc));
  })
}


var testingSchema = new mongoose.Schema({title: String});

var Testing = mongoose.model('Testing', testingSchema);

var testing = new Testing({title: 'what the fuck!!'});
testing.save(function(err, data) {
  if (err) {
    console.log(err.stack);
  } else {
    console.log(data);
  }
  // saved
});

Testing.create({title: 'sffsfs'}, function(err, data) {
  if (err) {
    console.log(err.stack);
  } else {
    console.log(data);
  }
})


var tankSchema = new mongoose.Schema({size: String});

var Tank = mongoose.model('Tank', tankSchema);

var small = new Tank({size: 'small'});
small.save(function(err, small) {
  if (err) {
    console.log(err.stack);
  } else {
    console.log(small);
  }
})

Tank.create({size: 'small123'}, function(err, small) {
  if (err) {
    console.log(err.stack);
  } else {
    console.log(small);
  }
})