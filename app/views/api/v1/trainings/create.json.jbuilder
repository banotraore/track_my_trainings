json.message 'Training created'
json.training do
  json.id @training.id
  json.start @training.date
  json.on_spikes @training.on_spikes
  json.description @training.description
  if @training.trainable_type == 'Athlete'
    json.title 'Personal'
  else
    json.title @training.trainable.name
  end

  json.facility @training.facility.name unless @training.facility_id.nil?
  if (@training.date <= DateTime.now || @training.trainable_type == 'Athlete') && @training.training_disciplines.exists?
    json.training_disciplines @training.training_disciplines do |discipline|
      json.discipline discipline.disciplinable.name
      json.id discipline.id
      json.disciplinable_type discipline.disciplinable_type
      json.disciplinable_id discipline.disciplinable_id
      json.sets_num discipline.sets_num
      json.reps_num discipline.reps_num
      json.exercice_order discipline.exercice_order
    end
  end
end
