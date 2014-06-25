app.collections.ProjectList = Backbone.Collection.extend({

  model: app.models.Project,
  // localStorage: new Backbone.LocalStorage('portfolio'),
  url: "/projects",

  initialize: function() {
    this.bind("add", this.setUserId);
  },

  setUserId: function(model) {
    if(this.user && this.user.id && !(model.get("id"))) {
      model.set({ user_id: this.user.id });
    }
  }

});
