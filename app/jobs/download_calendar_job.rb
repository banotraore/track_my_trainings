require 'icalendar'

class DownloadCalendarJob < ApplicationJob
  queue_as :default

  def perform(training_id)
    # byebug
    return if training_id.blank?

    @training = Training.find(training_id)
    cal = Icalendar::Calendar.new
    filename = 'training.ics'
    cal.event do |e|
      e.dtstart     = Icalendar::Values::DateTime.new(@training.date)
      e.dtend       = Icalendar::Values::DateTime.new(@training.date + 2.hours)
      e.summary = @training.trainable_type == 'Athlete' ? 'Individual training' : @training.trainable.name
      e.description = @training.description
    end

    ActionCable.server.broadcast("export_channel_#{training_id}", { training: cal.to_ical, filename: filename })
  end
end
