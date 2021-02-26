class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ActionController::RequestForgeryProtection
  include ActionController::Caching

  protect_from_forgery unless: -> { request.format.json? }

  def fallback_index_html
    render file: 'public/index.html'
  end
end
