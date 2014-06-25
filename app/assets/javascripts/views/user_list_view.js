app.views.UserListView = Backbone.View.extend({

  el: "#content",
  template: JST['templates/user-list-template'],
  events: {
    "click .profile-link": "showProfile"
  },

  render: function() {
    this.$el.html(this.template({ users: this.collection }));
    return this;
  },

  showProfile: function(e) {
    var link = $(e.currentTarget);
    var user_id = link.data('user-id');
    var router = new app.Routes();
    router.navigate("users/" + user_id, { trigger: true });
    e.preventDefault();
  }
});
