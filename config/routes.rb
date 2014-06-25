Rails.application.routes.draw do

  root to: 'users#index'
  resources :users, :only => [:index, :create, :show, :update] do
    collection do
      get :authorise_github
    end
  end

  get 'github_oauth_callback', {
    :to => 'users#github_oauth_callback',
    :as => :github_oauth_callback
  }

  resources :projects, :only => [:index, :create, :update]

end
