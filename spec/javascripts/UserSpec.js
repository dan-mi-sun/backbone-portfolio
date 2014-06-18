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

});
