Rails.application.routes.draw do
  root 'welcome#index'
  devise_for :admins
  devise_for :users

  resources :admins, only: [:show, :index, :create]
  resources :users, only: [:index, :show, :create]

  namespace :api do
    namespace :v1 do
      resources :admins, only: [:show]
        resources :stores, only: [:index, :show]
      end
    end

  namespace :api do
    namespace :v1 do
      post 'users/search', to: 'users#search'
    end
  end

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :show, :update]
    end
  end

end
