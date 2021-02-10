class ExportChannel < ApplicationCable::Channel
  def subscribed
    stream_from "export_channel_#{params[:training_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end
end
