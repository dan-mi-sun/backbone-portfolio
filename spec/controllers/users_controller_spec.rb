require 'spec_helper'

describe UsersController do

  context "Given some users" do
    before do
      3.times {User.create(:name => "Me", :image_url => "/", :bio => Faker::Company.bs, :mission => Faker::Company.catch_phrase)}
    end

    describe "GET to /users" do
      before do
        get :index
      end

      it "should give us some JSON with all the users" do
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(200)
        expect(JSON(response.body).length).to eq(3)
      end
    end
  end

  describe "POST to /users" do
    before do
      params = {
        user: {
          name: "Dan",
          image_url: "#",
          bio: @bs,
          mission: @m
        }
      }

      post :create, params
    end

    it "should set attributes on a user" do
      expect(assigns(:user).name).to eq("Dan")
      expect(assigns(:user).image_url).to eq("#")
      expect(assigns(:user).bio).to eq(@bs)
      expect(assigns(:user).mission).to eq(@m)
    end

    it "should save a user in the database" do
      expect(User.count).to eq(1)
    end

    it "should give us some JSON with the just added user" do
      expect(response.content_type).to eq("application/json")
      expect(response.status).to eq(200)
    end

    it "should return valid JSON" do
      expect(json = JSON(response.body)).to_not raise_error
      expect(json["name"]).to eq("Dan")
      expect(json["id"]).to_not be_nil
    end
  end

  describe "GET to /users/:id" do
    before do

      @user = User.create(:name => "Me", :image_url => "/", :bio => @bs, :mission => @m)

      params = {id: @user.id}

      get :show, params
    end

    it "should give us some JASON with the users details" do
      expect(response.content_type).to eq("application/json")
      expect(response.status).to eq(200)
      expect(JSON(response.body).first).to eq(["id", 1])
    end

    it "should set attributes on a user" do
      expect(assigns(:user).name).to eq("Me")
      expect(assigns(:user).image_url).to eq("/")
      expect(assigns(:user).bio).to eq(@bs)
      expect(assigns(:user).mission).to eq(@m)
    end

    it "should save a user in the database" do
      expect(User.count).to eq(1)
    end

    it "should give us some JSON with the just added user" do
      expect(response.content_type).to eq("application/json")
      expect(response.status).to eq(200)
    end

    it "should return valid JSON" do
      expect(json = JSON(response.body)).to_not raise_error
      expect(json["name"]).to eq("Me")
      expect(json["id"]).to eq(5)
    end
  end
end
