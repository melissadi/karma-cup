Rails.application.routes.draw do
  devise_for :admins
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :admins, only: [:show] do
        resources :stores, only: [:index, :show] do
          resources :rewards, only: [:index, :show]
        end
      end
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
      resources :stores, only: [:index, :show, :update] do
        resources :rewards, only: [:index, :show, :create, :destroy, :update]
      end
    end
  end

  get '*page', to: 'static_pages#index', constraints: ->(req) do
  !req.xhr? && req.format.html?
  end
  root 'welcome#index'

end
