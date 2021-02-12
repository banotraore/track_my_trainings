json.user do
  json.id @user.id
  json.email @user.email
  json.first_name @user.first_name
  json.last_name @user.last_name
  json.username @user.username

  if @user.coach
    json.coachID @user.coach.id

    if @user.coach.teams.exists?
      json.coach_teams @user.coach.teams do |team|
        json.id team.id
        json.name team.name
        json.slug team.slug
        json.athletes_count team.athletes.size
        json.coaches_count team.coaches.size
        json.groups team.groups.coach_in_group(@user) do |group|
          json.id group.id
          json.name group.name
        end
      end
    end
    if @user.coach.next_coach_training
      json.next_coach_training do
        json.id @user.coach.next_coach_training.id
        json.start @user.coach.next_coach_training.date.iso8601

        json.on_spikes @user.coach.next_coach_training.on_spikes

        json.description @user.coach.next_coach_training.description
        json.title @user.coach.next_coach_training.trainable.name
        unless @user.coach.next_coach_training.facility_id.nil?
          json.facility @user.coach.next_coach_training.facility.name
        end
        if @user.coach.next_coach_training.training_disciplines.exists?
          json.training_disciplines @user.coach.next_coach_training.training_disciplines do |discipline|
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
    end

    if @user.coach.last_coach_training
      json.last_coach_training do
        json.id @user.coach.last_coach_training.id
        json.start @user.coach.last_coach_training.date.iso8601

        json.description @user.coach.last_coach_training.description
        json.title @user.coach.last_coach_training.trainable.name
        unless @user.coach.last_coach_training.facility_id.nil?
          json.facility @user.coach.last_coach_training.facility.name
        end
        if @user.coach.last_coach_training.training_disciplines.exists?
          json.training_disciplines @user.coach.last_coach_training.training_disciplines do |discipline|
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
    end

  end

  if @user.athlete

    if @user.athlete.teams.exists?
      json.athlete_teams @user.athlete.teams do |team|
        json.id team.id
        json.name team.name
        json.slug team.slug
        json.athletes_count team.athletes.size
        json.coaches_count team.coaches.size

        json.groups team.groups.user_in_group(@user) do |group|
          json.id group.id
          json.name group.name
        end
      end
    end
    if @user.athlete.next_training
      json.next_training do
        json.id @user.athlete.next_training.id
        json.start @user.athlete.next_training.date

        json.description @user.athlete.next_training.description
        if @user.athlete.next_training.trainable_type == 'Athlete'
          json.title 'Personal'
          if @user.athlete.next_training.training_disciplines.exists?
            json.training_disciplines @user.athlete.next_training.training_disciplines do |discipline|
              json.discipline discipline.disciplinable.name
              json.id discipline.id
              json.disciplinable_type discipline.disciplinable_type
              json.disciplinable_id discipline.disciplinable_id
              json.sets_num discipline.sets_num
              json.reps_num discipline.reps_num
              json.exercice_order discipline.exercice_order
            end
          end

        else
          json.title @user.athlete.next_training.trainable.name
        end
        json.facility @user.athlete.next_training.facility.name unless @user.athlete.next_training.facility_id.nil?
      end
    end

    if @user.athlete.last_training
      json.last_training do
        json.id @user.athlete.last_training.id
        json.start @user.athlete.last_training.date

        json.description @user.athlete.last_training.description
        if @user.athlete.last_training.trainable_type == 'Athlete'
          json.title 'Personal'
        else
          json.title @user.athlete.last_training.trainable.name
        end
        json.facility @user.athlete.last_training.facility.name unless @user.athlete.last_training.facility_id.nil?
        if @user.athlete.last_training.training_disciplines.exists?
          json.training_disciplines @user.athlete.last_training.training_disciplines do |discipline|
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
    end

  end
end
