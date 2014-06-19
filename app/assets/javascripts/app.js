$(document).ready(function() {
  
  console.log(Backbone.history.start());
  var router = new app.Routes();
  router.navigate("users/index", { trigger: true });

});
