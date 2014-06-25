app.views.UserView = Backbone.View.extend({

  el: "#content",
  template: JST['templates/user-template'],
  events: {
    "dblclick h1.name": "editAttribute",
    "change .edit-name": "updateName",
    "dblclick h1.name": "editAttribute",
    "change .edit-bio": "updateBio",
    "dblclick h1.name": "editAttribute",
    "change .edit-mission": "updateMission"
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

    //Clear old projects from view
    $('#project-list').html("");

    // Render each project... sort of like a partial...
    _this.model.projects.each(function(project) {
      var view = new app.views.ProjectView({ model: project });
      $('#project-list').append(view.render().el);
    });

    // Redraw the page if the user model changes
    _this.listenTo(this.model, "change", this.render);

    return _this;
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
