app.models.User = Backbone.Model.extend({

  // localStorage: new Backbone.LocalStorage('user'),
  defaults: {
    name: null,
    bio: null,
    mission: null
  },

  validate: function() {
    if(this.attributes.fullName === "" || this.get('fullName') === undefined) {
      return "Name can't be blank"; 
    //   var errors = {messages : []};
    // if(!!(this.get('name'))) {
    //   errors.messages.push("Please fill in the name");
    //   return errors;
    // }
    };
  }
});
