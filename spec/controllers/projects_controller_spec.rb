require 'spec_helper'

describe ProjectsController do

  context "Given some projects" do
    before do
      %w(Ruby Backbone Rspec).each do |skill|
        p = Project.create!(:title => Faker::Lorem.sentence, :url => "/")
        p.skills << Skill.new(:name => skill) 
      end
  end

  describe "GET to /projects" do
    before do
      get :index
    end

    it "should give us some JSON with all the users" do
      expect(response.content_type).to eq("application/json")
      expect(response.status).to eq(200)
      expect(JSON(response.body).length).to eq(3)
    end

    it "should also fetch the associated Skills" do
      projects = JSON(response.body)
      skills = projects.first["skills"]
      expect(skills.length).to eq(1)
      expect(skills.first["name"]).to eq("Ruby")
    end
  end
end

describe "POST to /projects" do
  before do
    params ={
      project: {
        title: "Title POST",
        url: "/"
      }
    }

    post :create, params
  end

  it "should set attributes on a user" do
    expect(assigns(:project).title).to eq("Title POST")
    expect(assigns(:project).url).to eq("/")
  end

  it "should save a project in the database" do
    expect(Project.count).to eq(1)
  end

  it "should give us some JSON with the just added project" do
    expect(response.content_type).to eq("application/json")
    expect(response.status).to eq(200)
  end

  it "should return valid JSON" do
    expect(json = JSON(response.body)).to_not raise_error
    expect(json["title"]).to eq("Title POST")
    expect(json["id"]).to_not be_nil
  end
end
end
