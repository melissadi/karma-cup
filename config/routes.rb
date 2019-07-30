Rails.application.routes.draw do
  devise_for :admins
  devise_for :users

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '*page', to: 'static_pages#index', constraints: ->(req) do
  !req.xhr? && req.format.html?
  end

  root 'static_pages#index'
end
