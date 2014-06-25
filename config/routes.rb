Rails.application.routes.draw do

  root to: 'users#index'
  resources :users, :only => [:index, :create, :show, :update]
  resources :projects, :only => [:index, :create, :update]

end
