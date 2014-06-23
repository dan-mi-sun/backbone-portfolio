app.Routes = Backbone.Router.extend({

  routes : {
    "": "userIndex",
    "users": "userIndex",
    "users/:id": "userShow"
  },

  userIndex: function() {
    var users = new app.collections.UserList();
    users.fetch({
      success: function(users) {
        if(users.length == 0) users.create({
          name: "Edit me",
          bio: "Edit me",
          mission: "Edit me",
          image_url: "uploads/me.jpg"
        });

        var userListView = new app.views.UserListView({ collection: users });
        userListView.render();
      },
    });
  },

  userShow: function(id) {
    var user = new app.models.User({ id: id });
    user.fetch({
      success: function(user) {
        var userView = new app.views.UserView({ model: user });
        userView.render();
      },
      });
    }
  });
