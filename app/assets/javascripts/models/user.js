app.models.User = Backbone.Model.extend({

  url: "/users",

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
    if(this.attributes.fullName === "" || this.get('fullName') === undefined) {
      return "Name can't be blank"; 
    };
  },

  fetchProjects: function() {
    if(this.id) {
      this.projects.fetch();
      this.projects.reset(this.projects.where({ user_id: this.id }));
    }
  }
});
