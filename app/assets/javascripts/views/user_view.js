app.views.UserView = Backbone.View.extend({

  el: "#content",
  template: JST['templates/user-template'],
  events: {
    "dblclick h1.name": "editAttribute",
    "change .edit-name": "updateName",
    "dblclick h2.bio": "editAttribute",
    "change .edit-bio": "updateBio",
    "dblclick h3.mission": "editAttribute",
    "change .edit-mission": "updateMission"
  },

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model.projects, "reset", this.render);
    return this;
  },

  render: function() {
    //Render the user bio section
    var _this = this;
    _this.$el.html(_this.template(_this.model.attributes));

    // Create a dummy project if there isn't one already
    if(_this.model.projects.length == 0) {
      _this.model.projects.add({
        title: "New Project",
        url: "Click to edit",
        body: "Click to edit"
      });
    }

    // $('#project-list').html("");

    // Render each project... sort of like a partial...
    _this.model.projects.each(function(project) {
      var view = new app.views.ProjectView({ model: project });
      $('#project-list').append(view.render().el);
    });

    // Redraw the page if the user model changes

  },

  editAttribute: function(e) {
    $(e.currentTarget).hide().next('.hidden-edit').fadeIn();
  },

  updateName: function(e) {
    this.model.set('name', e.currentTarget.value);
    this.model.save();
  },

  updateBio: function(e) {
    this.model.set('bio', e.currentTarget.value);
    this.model.save();
  },

  updateMission: function(e) {
    this.model.set('mission', e.currentTarget.value);
    this.model.save();
  }

});
