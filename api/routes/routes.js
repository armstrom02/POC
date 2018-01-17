'use strict';
module.exports = function(app) {
  var call= require('../controller/controller');

  // todoList Routes
  app.route('/user')
    .get(call.get_all)
    .post(call.create_user);

  app.route('/user/login')
    .post(call.get_user)
    .put(call.update_user)
    .delete(call.delete_user);

};