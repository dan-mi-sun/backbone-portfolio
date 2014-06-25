app.models.Project = Backbone.Model.extend({

  // localStorage: new Backbone.LocalStorage('portfolio'),

  urlRoot:'/projects',

  initialize: function() {
    if(!this.skills) this.skills = new app.collections.SkillList();
    this.listenTo(this.skills, "add", this.save);
    this.listenTo(this.skills, "remove", this.save);
  },

  validate: function() {
    if(this.attributes.url === "") {
      return "URL can't be blank";
    };

    if(this.attributes.title === "") {
      return "Title can't be blank";
    };
  },

  parse: function(response) {
    var _this = this;
    if(!this.skills) this.skills = new app.collections.SkillList();
    this.skills.reset(response.skills, {silent: true});
    return response;
  },

  toJSON: function() {
    var params = {};
    params.title = this.get('title');
    params.skills_attributes = [];
    var _this = this;
    this.skills.each(function(skill) {
      var skill_info = {
        name: skill.get('name'),
        project_id: _this.id
      }

      if(skill.get('id')) skill_info.id = skill.get('id');
      if(skill.get('_destroy')) skill_info["_destroy"] = true;
      params.skills_attributes.push(skill_info);
    });

    return {project: params};
  }

});
