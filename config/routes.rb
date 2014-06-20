Rails.application.routes.draw do

  resources :users, :only => [:index, :create, :show]
  resources :projects, :only => [:index, :create]

end
