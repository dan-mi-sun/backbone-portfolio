describe("A User", function() {

  var user;

  beforeEach(function() {
    user = new app.models.User({
      fullName: "Daniel Sun",
      bio: "Wax on, wax off",
      imgUrl: "#",
      mission: "Time travel"
    });
  });

  it("should be able to retreive the name", function() {
    expect(user.get("fullName")).toEqual("Daniel Sun");
  });


  describe("validation", function() {
    beforeEach(function() {
      user = new app.models.User({
        fullName: ""
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

      var someoneElse = new app.models.User({fullName: "Bob"});
      someoneElse.save();
      someoneElse.projects.create({ title: "Test", url: "/" });

      var project = new app.models.Project({
        title: "A new project"
      });
      user.save();
      user.projects.create(project);
    });

    it("should store the projects as well", function(){
      saved_user = new app.models.User({ id: user.id });
      saved_user.fetch();
      expect(saved_user.projects.length).toEqual(1);
    });
  });

    afterEach(function() {
      localStorage.clear();
    });

});
