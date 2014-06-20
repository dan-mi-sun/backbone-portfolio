app.collections.UserList = Backbone.Collection.extend({

  url: "/users",
  model: app.models.User,

});
