app.models.User = Backbone.Model.extend({

  urlRoot: "/users",

  // defaults: {
  //   name: null,
  //   bio: null,
  //   mission: null
  // },

  initialize: function () {
    this.projects = new app.collections.ProjectList();
    this.projects.user = this;
    // this.projects.fetch();
    this.bind("sync", this.fetchProjects);
  },

  validate: function() {
    if(this.attributes.name === "" || this.get('name') === undefined) {
      return "Name can't be blank"; 
    };
  },

  fetchProjects: function() {
    if(this.id) {
      var _this = this;
      this.projects.fetch({
        success: function(projects) {
      _this.projects.reset(_this.projects.where({ user_id: _this.id }));
        }
      });
    }
  }
});
