class Api::V1::FetchesController < ApplicationController
  RECAPTCHA_MINIMUM_SCORE = 0.5

  def get_gif
    response = RestClient.get(
      "https://api.giphy.com/v1/gifs/search?api_key=#{ENV['GIPHY_API_KEY']}&q=nothing&limit=1&offset=0&rating=g&lang=en"
    )

    render json: response
  end

  def check_captcha
    # byebug
    response = RestClient.post(
      'https://www.google.com/recaptcha/api/siteverify',
      { response: params[:token], secret: ENV['RECAPTCHA_SECRET_KEY'] }
    )
    json = JSON.parse(response)
    if json['success'] && json['score'] >= RECAPTCHA_MINIMUM_SCORE
      render json: response
    else
      render json: { errors: 'bot suspected', message: 'ot suspected' },
             status: :unprocessable_entity
    end
  end
end
