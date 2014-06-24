app.views.SkillView = Backbone.View.extend({
 

  tageName: 'li',
  className: 'skill',

  events: {
    'click .delete': "removeSkill"
  },

  render: function() {

  // this.$el.append(span).replace('Ruby', this.model.get('name')).append(span)
  var name = this.model.get('name'); 
  this.$el.append(this.template.replace('Ruby', name ? name : 'Edit ME'));

  return this/
  },

  removeSkill: function() {
    // this.model.destroy();
    this.collection.remove(this.model);
  }
 });
