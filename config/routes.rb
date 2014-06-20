Rails.application.routes.draw do

  resources :users, :only => [:index, :create]
  resources :projects, :only => [:index, :create]

end
