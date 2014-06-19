app.views.UserView = Backbone.View.extend({

  el: "#user",
  template:  _.template($('#bio-template').html()),
  events: {
    "dblclick h1.fullName": "editName",
    "change .edit-name": "updateName",
    "dblclick h2.bio": "editBio",
    "change .edit-bio": "updateBio",
    "dblclick h3.mission": "editMission",
    "change .edit-mission": "updateMission"
  },

  render: function() {
  // Create a dummy project if there isn't one already
  if(this.model.projects.length == 0) {
    this.model.projects.add({
      title: "New Project",
      url: "Click to edit",
      body: "Click to edit"
    });
  }
  $('#project-list').html("");

  this.model.projects.each(function(project) {
    var view = new app.views.ProjectView({ model: project });
    $('#project-list').append(view.render().el);
  });
    this.$el.html(this.template(this.model.attributes)); 
    this.listenTo(this.model, "change", this.render);
    return this;
    },

  editName: function(e) {
    $(e.currentTarget).hide().next('.edit-name').fadeIn();
  },

  updateName: function(e) {
    this.model.set('fullName', e.currentTarget.value);
    this.model.save();
  },

  editBio: function(e) {
    $(e.currentTarget).hide().next('.edit-bio').fadeIn();
  },

  updateBio: function(e) {
    this.model.set('bio', e.currentTarget.value);
    this.model.save();
  },

  editMission: function(e) {
    $(e.currentTarget).hide().next('.edit-mission').fadeIn();
  },

  updateMission: function(e) {
    this.model.set('mission', e.currentTarget.value);
    this.model.save();
  }
  
});
