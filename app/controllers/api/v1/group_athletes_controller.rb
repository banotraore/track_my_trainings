class Api::V1::GroupAthletesController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_current_api_v1_user

  def create
    @group_athlete = GroupAthlete.new(athlete_id: @athlete.id, group_id: params[:group_id])

    begin
      @group_athlete.save!
      render json: { group_athlete: @group_athlete, message: 'Group joined!!!', status: :created }
    rescue Exception => e
      render json: { errors: @group_athlete.errors.messages, message: 'Trouble during the process' },
             status: :unprocessable_entity
    end
  end

  private

  def set_current_api_v1_user
    @athlete = current_api_v1_user.athlete
  end

  def group_athlete_params
    params.require(:group_athlete).permit(:athlete_id, :group_id)
  end
end
