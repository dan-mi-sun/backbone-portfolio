app.views.ProjectView = Backbone.View.extend({

  tagName: 'div',
  className: 'project',
  template: JST['templates/project-template'],
  events: {
    'dblclick .project-name': 'editProjectName',
    'change .edit-title': 'updateTitle',
     'click .add-skill': 'addSkill'
  },
  
  initialize: function() {
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model.skills, "add", this.render);
    this.listenTo(this.model.skills, "remove", this.render);
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));

    var skill_list = this.$el.find(".skill-list");
    var _this = this;
    skill_list.html('');
    this.model.skills.each(function(skill) {
      var skill_view = new app.views.SkillView({
     model: skill,
     collection: _this.model.skills
      });
      skill_list.append(skill_view.render().el);
    });
    
    return this;
  },

  editProjectName: function() {
    this.$el.addClass('editing');
    this.$el.find('.edit-title').show().focus().prev('h3').hide();
  },

  updateTitle: function() {
    var new_title = this.$el.find('.edit-title').val().trim();
    this.model.set('title', new_title);
     this.model.save();
  },

  addSkill: function(e) {
    this.model.skills.add({name: 'Cool Beans'});
  }
});
