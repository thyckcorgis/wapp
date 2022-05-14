Rails.application.routes.draw do
  resources :users do
    resources :follows
    resources :logs
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "users#index"
end
