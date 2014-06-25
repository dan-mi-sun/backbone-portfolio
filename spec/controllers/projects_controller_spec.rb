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

  describe "PUT to /projects/:id" do
    before do
      @skill = Skill.new(:name => "Nested Attributes")
      @php = Skill.new(:name => "PHP")
      @project = Project.create!(:title => "My Amazing Project")
      @project.skills << @skill
      @project.skills << @php

      params = {
        id: @project.id,
        project: {
          title: "Updated Project",
          skills_attributes: [
            { name: 'Ruby' },
            { name: 'RSpec'},
            { name: 'Cucumber'},
            { id: @skill.id, name: 'Nested Attributes Rock'},
            { id: @php.id, :_destroy => '1' }
          ]
        }
      }

      put :update, params

      @project.reload

    end

    it "should also create associated skills" do
      expect(@project.skills.length).to eq(4)
      expect(@project.skills.first.name).to eq("Ruby")
      expect(@project.skills.second.name).to eq("RSpec")
    expect(@project.skills.third.name).to eq("Cucumber")
  end

  it "should also update associated skills" do
    expect(@skill.reload.name).to eq("Nested Attributes Rock")
  end

  it "should also delete associated skills" do
    expect(Skill.find_by_id(@php.id)).to be_nil
  end
  end
end
