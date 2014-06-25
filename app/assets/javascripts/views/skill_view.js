app.views.SkillView = Backbone.View.extend({

  tagName: 'li',
  className: 'skill',
  template: '<span class="name">Ruby</span><span class="delete">Remove</span>',
  editBox: '<input type=text class=skillName placeholder="Skill Name" />',

  events: {
    'click .delete': "removeSkill",
    'dblclick .name': 'editName',
    'change .skillName': 'updateName'
  },

  render: function() {
    var name = this.model.get('name');
    this.$el.append(this.template.replace('Ruby', name ? name : 'Edit Me'));

    return this;
  },

  removeSkill: function() {
    this.model.set("_destroy", true);
    this.collection.trigger("remove");
  },

  editName: function(e) {
    var name = $(e.currentTarget);
    name.replaceWith(this.editBox).focus();
  },

  updateName: function(e) {
    this.model.set('name', e.currentTarget.value);
    this.collection.trigger("add");
  }
 });
