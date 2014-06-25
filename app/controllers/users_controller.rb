class UsersController < ApplicationController
  def index
    @users = User.all

    respond_to do |format|
      format.json { render :json => @users }
      format.html
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

  def authorise_github
    redirect_to github_oauth_client.auth_code.authorize_url( 
              :redirect_uri => github_oauth_callback_url,
              :scope => %w(user user:email public_repo).join(","))
  end

  def github_oauth_callback
    access_token = github_oauth_client.auth_code.get_token(params[:code],
        :redirect_uri => github_oauth_callback_url)
    user_info = JSON(access_token.get('https://api.github.com/user').body).symbolize_keys

    github_id = user_info[:id]
    @user = User.find_or_create_by!(:github_id => github_id, 
                                   :name => user_info[:name],
                                   :bio => user_info[:bio],
                                   :mission => user_info[:company],
                                   :image_url => user_info[:avatar_url]
                                   )
    @user.access_token = access_token.token
    @user.save!

    redirect_to users_path
  end

  private
  def allowed_params
    params.require(:user).permit(:name, :bio, :mission, :image_url)
  end

  def github_oauth_client
   @github_oauth_client ||= OAuth2::Client.new(
     BackbonePortfolio::Application.config.github_application_id, 
     BackbonePortfolio::Application.config.github_secret, 
     site: "https://github.com",
     :authorize_url => "/login/oauth/authorize",
     :token_url => "/login/oauth/access_token"
   )
  end
end
