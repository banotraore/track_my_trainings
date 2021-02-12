class Api::V1::GroupsController < ApplicationController
  before_action :authenticate_api_v1_user!
  def index
    @groups = current_api_v1_user.coach.groups
  end
end
