class Api::V1::AthletesController < ApplicationController
  before_action :authenticate_api_v1_user!
  def index
    @athletes = current_api_v1_user.coach.athletes
  end
end
