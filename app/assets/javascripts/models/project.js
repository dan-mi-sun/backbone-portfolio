app.models.Project = Backbone.Model.extend({

  // localStorage: new Backbone.LocalStorage('portfolio'),
  url: "/projects",

  initialize: function() {
    this.skills = new app.collections.SkillList();
    this.listenTo(this.skills, "add", this.save);
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

    // if(!this.skills) this.skills = new app.collectionsSkillList();
    
    _(response.skills).each(function(skill) {
      _this.skills.add(skill);
    });

    return response;
  }

});
