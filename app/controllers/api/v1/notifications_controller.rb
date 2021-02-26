class Api::V1::NotificationsController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_notification, only: [:update]

  def index
    @notifications = current_api_v1_user.notifications.unopened
  end

  def update
    if @notification.update(notification_params)
      render json: { status: :ok }
    else
      render json: @notification.errors, status: :unprocessable_entity
    end
  end

  private

  def set_notification
    @notification = Notification.find(params[:id])
  end

  def notification_params
    params.require(:notification).permit(:user_id, :content, :is_opened)
  end
end
