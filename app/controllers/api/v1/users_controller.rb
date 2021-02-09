class Api::V1::UsersController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_current_api_v1_user

  def get_infos
    render :get_infos, status: :ok
  end

  def get_profile
    render :get_profile, status: :ok
  end

  private

  def set_current_api_v1_user
    @user = current_api_v1_user
  end
end
