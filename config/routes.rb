Rails.application.routes.draw do
  root 'patterns#index'
  devise_for :users

  resources :patterns, only: [:index, :show]

  namespace :api do
    namespace :v1 do
      resources :patterns, only: [:index, :show, :create, :destroy, :update]
    end
  end
end
