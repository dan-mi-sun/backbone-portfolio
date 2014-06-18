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
