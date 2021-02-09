class Api::V1::TrainingsController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :find_trainable, only: [:create]

  def index
    # by default get the personnal trainings and the groups trainings of an athlete
    @trainings = current_api_v1_user.athlete.group_trainings.order(date: :desc) + current_api_v1_user.athlete.trainings.order(date: :desc)
    # if it's a coach add the groups trainings
    @trainings += current_api_v1_user.coach.group_trainings.order(date: :desc) if current_api_v1_user.coach
  end
end
