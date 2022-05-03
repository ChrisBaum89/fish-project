Rails.application.routes.draw do
  resources :carts
  resources :users
  resources :fish
  resources :categories
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
