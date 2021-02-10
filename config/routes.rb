Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'
      # resources :teams, only: %i[index]
      resources :trainings, only: %i[index create update]
      resources :disciplines, only: %i[index]
      resources :groups, only: %i[index]
      resources :athletes, only: %i[index]
      get '/infos' => 'users#get_infos'
      get '/my-profile' => 'users#get_profile'
      get '/ddl-training/:id' => 'trainings#download_training'
      post 'multiple-trainings' => 'trainings#create_multiple_record'

      mount ActionCable.server => '/cable'
    end
  end

  get '*path', to: 'application#fallback_index_html', constraints: lambda { |request|
    !request.xhr? && request.format.html?
  }
end
