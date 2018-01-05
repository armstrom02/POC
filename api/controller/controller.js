'use strict';



var mongoose = require('mongoose'),
  Task = mongoose.model('userp'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt');



exports.get_all = function (req, res) {
  Task.find({}, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};



exports.create_user = function (req, res) {
  var new_task = new Task(req.body);
  var hash = bcrypt.hashSync(req.body.password, 10);
  new_task.password = hash;
  new_task.save(function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.get_user = (req, res) => {
  var name = req.params.name;
  var password = req.params.password;
  console.log(password + " check pass" + name);
  Task.findOne({ name: name }).exec().then(user => {


    if (user !== null) {
      var hashedPassword = user.password;
      bcrypt.compare(password, hashedPassword, function (err, response) {
        if (response) {

          res.json({
            success: true,
            body: user,
            token: jwt.sign({ email: user.email, fullName: user.name }, 'MYSECRETKEY',{expiresIn: 3600 // expires in 24 hours
            })

          });// Passwords match
        } else {
          res.json({
            success: false,
            body: "password does not match"
          });// Passwords don't match
        }
      });
    }
    else
      res.json(
        {
          success: false,
          body: "User doesnot exists"
        }
      );
  });
}


exports.update_user = function (req, res) {
  Task.findOneAndUpdate({ name: req.params.name }, req.body, { new: true }, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_user = function (req, res) {
  Task.remove({
    name: req.params.name
  }, function (err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};