Rails.application.routes.draw do
  devise_for :admins
  devise_for :users

  # resources :admins, only: [:show]
  # resources :users, only: [:index, :show]

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

  get '*page', to: 'static_pages#index', constraints: ->(req) do
  !req.xhr? && req.format.html?
  end
  root 'static_pages#index'
end
