class UsersController < ApplicationController
  def index
    render :json => User.all
  end

  def create
    @user = User.create(allowed_params)
    @user.save
    render :json => @user
  end

  private
  def allowed_params
    params.require(:user).permit(:name, :bio, :mission, :image_url)
  end
end
