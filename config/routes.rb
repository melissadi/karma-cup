Rails.application.routes.draw do
  devise_for :admins, path: 'admins'
  devise_for :users, path: 'users'

  namespace :api do
    namespace :v1 do
      post 'users/search', to: 'users#search'
    end
  end

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :show, :update]
      resources :rewards, only: [:index]
      resources :exchanges, only: [:index, :show, :create, :update]
      resources :admins, only: [:show]
      resources :stores, only: [:index, :show, :update] do
        resources :rewards, only: [:create, :destroy, :update, :show]
      end
    end
  end

  get '*page', to: 'static_pages#index', constraints: ->(req) do
  !req.xhr? && req.format.html?
  end
  root 'welcome#index'

end
