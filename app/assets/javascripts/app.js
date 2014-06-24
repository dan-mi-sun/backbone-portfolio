$(document).ready(function() {
if(!window.jasmine) { 
  console.log(Backbone.history.start({ pushState: true }));
  var router = new app.Routes();
  router.navigate("users", { trigger: true });
}
});
