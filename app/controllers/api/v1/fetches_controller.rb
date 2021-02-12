class Api::V1::FetchesController < ApplicationController
  def get_gif
    response = RestClient.get(
      "https://api.giphy.com/v1/gifs/search?api_key=#{ENV['GIPHY_API_KEY']}&q=nothing&limit=1&offset=0&rating=g&lang=en"
    )

    render json: response
  end
end
