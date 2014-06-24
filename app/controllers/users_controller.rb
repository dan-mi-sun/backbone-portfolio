class UsersController < ApplicationController
  def index
    @users = User.all

    respond_to do |format|
      format.html
      format.json { render :json => @users }
    end
  end

  def show
    @user = User.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render :json => @user }
    end
  end

  def create
    @user = User.create(allowed_params)
    @user.save
    render :json => @user
  end

  def update
    @user = User.find(params[:id])
    @user.update(allowed_params)
    @user.save
    render :json => @user
  end

  private
  def allowed_params
    params.require(:user).permit(:name, :bio, :mission, :image_url)
  end
end
