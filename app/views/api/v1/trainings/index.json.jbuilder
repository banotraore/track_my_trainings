json.trainings @trainings do |training|
  json.id training.id
  json.start training.date.utc.strftime('%F %H:%M:%S')
  json.description training.description
  json.on_spikes training.on_spikes
  if training.trainable_type == 'Athlete'
    json.title 'Personal'
    json.updatable true
  else
    json.title training.trainable.name
  end
  if training.is_coaching?(current_api_v1_user) 
    json.updatable true
  end

  json.facility training.facility.name unless training.facility_id.nil?
  # only show the training_disciplines if it's a past session, the user is coaching that session 
  # or if it's a personnal session trainable_type == 'Athlete'
  if (training.date <= DateTime.now || training.is_coaching?(current_api_v1_user) || training.trainable_type == 'Athlete') && training.training_disciplines.exists?
    json.training_disciplines training.training_disciplines do |discipline|
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
