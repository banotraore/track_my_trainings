class NotificationsJob < ApplicationJob
  queue_as :default

  def perform(training)
    return if training.blank?

    if training.trainable_type == 'Group'
      group = Group.find(training.trainable_id)
      group.group_athletes.each do |group_athlete|
        user = User.find(group_athlete.athlete.user_id)

        Notification.create(user_id: user.id, content: "New training #{training.date.utc.strftime('%F %H:%M:%S')}")
        ActionCable.server.broadcast("notification_channel_#{user.id}",
                                     { content: "New training #{training.date.utc.strftime('%F %H:%M:%S')}" })
      end
    else
      user = User.find(training.trainable.user_id)
      Notification.create(user_id: user.id, content: "New training #{training.date.utc.strftime('%F %H:%M:%S')}")
      ActionCable.server.broadcast("notification_channel_#{user.id}",
                                   { content: "New training #{training.date.utc.strftime('%F %H:%M:%S')}" })
    end
  end
end
