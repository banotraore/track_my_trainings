class Api::V1::AthletesController < ApplicationController
  def index
    @athletes = current_api_v1_user.coach.athletes
  end
end
