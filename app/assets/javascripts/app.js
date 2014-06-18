$(document).ready(function() {

  var users = new app.collections.UserList();
  users.fetch();
  if(users.length == 0) users.add({});

  var user = users.models[0];
  user.fetch();

  var userView = new app.views.UserView({ model: users.models[0] });
    userView.render();

});
