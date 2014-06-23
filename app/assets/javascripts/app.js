$(document).ready(function() {
  
  console.log(Backbone.history.start({ pushState: true }));
  var router = new app.Routes();
  router.navigate("users", { trigger: true });

});
