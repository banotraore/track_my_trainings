class Api::V1::TeamsController < ApplicationController
  before_action :authenticate_api_v1_user!

  def index
    @teams = Team.all
  end

  def show
    @team = Team.friendly.find(params[:id])
  end
end
