describe("A Project", function() {

  var project;

  beforeEach(function() {
    project = new app.models.Project({
      title: "My amazing test project",
      url: "http://example.org"
    });
  });

  describe("fetching a project with skills", function() {
    beforeEach(function() {
      // var dummyObject = {};
      // spyOn($, "ajax").andReturn(dummyObject);
      var json = JSON.parse("{\"id\":null,\"title\":\"I love parsing\",\"url\":\"http://github.com\",\"skills\":[{\"id\":null,\"name\":\"Ruby\",\"project_id\":null},{\"id\":null,\"name\":\"JSON\",\"project_id\":null}]}");
      project.set(project.parse(json));

      // project.fetch();
    })

    it("should parse the essential details", function() {
      expect(project.get('title')).toEqual("I love parsing");
      expect(project.get('url')).toEqual("http://github.com");
    });

    it("should hold a collection of all the associated skills", function() {
      expect(project.skills.length).toEqual(2); 
    });
  });

  it("should be able to retreive the title", function() {
    expect(project.get("title")).toEqual("My amazing test project");
  });

  it("should not have an id because its not persisted", function() {
    expect(project.id).toBeUndefined();
  });

  it("should have an cid", function() {
    expect(project.cid).not.toBe(null);
  });

  describe("Persistance in local storage", function() {
    beforeEach(function() {
      project.localStorage = new Backbone.LocalStorage('potfolio');
      project.save();
    });

    it("should have an id", function() {
      expect(project.id).not.toBe(null);
    });
  });

  describe("validation", function() {
    beforeEach(function() {
      project = new app.models.Project({
        title: "My amazing test project",
        url: ""
      });
    });

    it("should not be valid without a URL", function() {
      expect(project.isValid()).toBeFalsy();
    });
  });

});
