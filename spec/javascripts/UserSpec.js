describe("A User", function() {

  var user;

  beforeEach(function() {
    user = new app.models.User({
      name: "Daniel Sun",
      bio: "Wax on, wax off",
      imgUrl: "#",
      mission: "Time travel"
    });
    
      spyOn($, "ajax");
  });

  it("should be able to retreive the name", function() {
    expect(user.get("name")).toEqual("Daniel Sun");
  });


  describe("validation", function() {
    beforeEach(function() {
      user = new app.models.User({
        name: ""
      });
    });

    it("should not be valid without a name", function() {
      expect(user.isValid()).toBeFalsy();
      // expect(user.validationError.message).toEqual(["Name can't be blank"]);
    });
  });

  describe("projects", function(){
    beforeEach(function() {
      //wipe old project storage
      // localStorage.clear();
      
      var someoneElse = new app.models.User({name: "Bob"});
      someoneElse.save();
      someoneElse.projects.create({ title: "Test" });

      var project = new app.models.Project({
        title: "A new project"
      });
      user.save();
      user.projects.create(project);
    });

    it("should persist the users via AJAX", function() {
      var lastAjaxCallArgs = $.ajax.calls[0].args[0];
      expect(lastAjaxCallArgs.url).toEqual("/users");
      expect(lastAjaxCallArgs.type).toEqual("POST");
      expect(lastAjaxCallArgs.data).toEqual(JSON.stringify({name: "Bob"}));

      var lastAjaxCallArgs = $.ajax.calls[1].args[0];
      expect(lastAjaxCallArgs.url).toEqual("/projects");
      expect(lastAjaxCallArgs.type).toEqual("POST");
      expect(lastAjaxCallArgs.data).toEqual(JSON.stringify({title: "Test"}));

      var lastAjaxCallArgs = $.ajax.calls[2].args[0];
      expect(lastAjaxCallArgs.url).toEqual("/users");
      expect(lastAjaxCallArgs.type).toEqual("POST");
      expect(lastAjaxCallArgs.data).toEqual(JSON.stringify({
        name: "Daniel Sun",
        bio: "Wax on, wax off",
        imgUrl: "#",
        mission: "Time travel"
      }));

      var lastAjaxCallArgs = $.ajax.calls[3].args[0];
      expect(lastAjaxCallArgs.url).toEqual("/projects");
      expect(lastAjaxCallArgs.type).toEqual("POST");
      expect(lastAjaxCallArgs.data).toEqual(JSON.stringify({title: "A new project"}));
    });

    // it("should store the projects as well", function(){
    //   saved_user = new app.models.User({ id: user.id });
    //   saved_user.fetch();
    //   expect(saved_user.projects.length).toEqual(1);
    // });
  });

  afterEach(function() {
    localStorage.clear();
  });

});
