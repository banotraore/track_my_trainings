class Api::V1::GroupsController < ApplicationController
  def index
    @groups = current_api_v1_user.coach.groups
  end
end
