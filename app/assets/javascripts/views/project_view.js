app.views.ProjectView = Backbone.View.extend({

  tagName: 'div',
  className: 'project',
  template: JST['templates/project-template'],
  events: {
    'dblclick .project-name': 'editProjectName',
    'keypress .edit-title': 'updateTitle'
  },
  
  initialize: functions() {
    this.listenTo(this.model.skills, "add", this.render);
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));

    var skill_list = this.$el.find(".skill-list");
    var _this = this;
    skill_list.html('');
    this.model.skills.each(function(skill) {
      var skill_view = new app.views.SkillView({
     model: skill,
     collection: _this.
      })
    })
    
    return this;
  },

  editProjectName: function() {
    this.$el.addClass('editing');
    this.$el.find('.edit-title').show().focus().prev('h3').hide();
  },

  updateTitle: function() {
    var new_title = this.$el.find('.edit-title').val().trim();
    if(event.which !== 13 || !new_title) {
      return;
    }

    this.model.set('title', new_title);
    this.model.save();
    this.$el.find('.edit-title').val('').hide().prev('h3').show().html(new_title);
  }

  addSkill: function(e) {
    this.model.skills.add({});
  }
});
