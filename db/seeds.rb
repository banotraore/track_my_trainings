User.destroy_all
Team.destroy_all
Group.destroy_all

Training.destroy_all
TrainingDiscipline.destroy_all
Facility.destroy_all
Race.destroy_all
Jump.destroy_all
Weigth.destroy_all
Throw.destroy_all

Discipline.destroy_all

# Create the default athlete and coach
User.create(email: 'johndoe@trackmytrainings.com', password: 'password', first_name: 'john', last_name: 'doe',
            username: 'john_doe')
zidane = User.create(email: 'zizou@trackmytrainings.com', password: 'password', first_name: 'zinedine', last_name: 'zidane',
                     username: 'zizou')
Coach.create(user_id: zidane.id)

40.times do
  users = [Faker::Sports::Basketball.player, Faker::Sports::Football.player]
  user = users.sample
  user = user.downcase.split(' ')
  user_first_name = user[0]
  user_last_name = user[1]
  user_email = "#{user[0]}_#{user[1]}@trackmytrainings.com"
  user_username = "#{user[0]}_#{user[1]}"
  User.create(email: user_email, password: 'password', first_name: user_first_name, last_name: user_last_name,
              username: user_username)
end

# then create new users that would be coachs
coachs = [Faker::Sports::Basketball.coach, Faker::Sports::Football.coach]
# 1st coach
first_coach = coachs.sample
first_coach = first_coach.downcase.split(' ')
first_coach_first_name = first_coach[0]
first_coach_last_name = first_coach[1]
first_coach_email = "#{first_coach[0]}_#{first_coach[1]}@trackmytrainings.com"
first_coach_username = "#{first_coach[0]}_#{first_coach[1]}"
coach1 = User.create!(email: first_coach_email, password: 'password', first_name: first_coach_first_name,
                      last_name: first_coach_last_name, username: first_coach_username)

# 2nd coach
second_coach = coachs.sample
second_coach = second_coach.downcase.split(' ')
second_coach_first_name = second_coach[0]
second_coach_last_name = second_coach[1]
second_coach_email = "#{second_coach[0]}_#{second_coach[1]}@trackmytrainings.com"
second_coach_username = "#{second_coach[0]}_#{second_coach[1]}"
coach2 = User.create(email: second_coach_email, password: 'password', first_name: second_coach_first_name,
                     last_name: second_coach_last_name, username: second_coach_username)

# 3rd coach
third_coach = coachs.sample
third_coach = third_coach.downcase.split(' ')
third_coach_first_name = third_coach[0]
third_coach_last_name = third_coach[1]
third_coach_email = "#{third_coach[0]}_#{third_coach[1]}@trackmytrainings.com"
third_coach_username = "#{third_coach[0]}_#{third_coach[1]}"
coach3 = User.create(email: third_coach_email, password: 'password', first_name: third_coach_first_name,
                     last_name: third_coach_last_name, username: third_coach_username)

Coach.create(user_id: coach1.id)
Coach.create(user_id: coach2.id)
Coach.create(user_id: coach3.id)

15.times do
  teams = [Faker::Sports::Basketball.team, Faker::Sports::Football.team]
  Team.create(name: teams.sample)
end

15.times do
  teams = [Faker::Sports::Basketball.team, Faker::Sports::Football.team]
  Team.create(name: teams.sample)
end

# For more clarity those are "real track and fiels event families"
group_names = ['sprint', 'hurdles', 'multi-events', 'long jump - triple jump', 'throws', 'long distance']

15.times do
  Group.create(
    team_id: Team.order(Arel.sql('RANDOM()')).first.id,
    name: group_names.sample
  )
end

# Assign the coachs to different groups
10.times do
  GroupCoach.create(
    coach_id: Coach.order(Arel.sql('RANDOM()')).first.id,
    group_id: Group.order(Arel.sql('RANDOM()')).first.id
  )
end

#  Assigns athletes to some groups
70.times do
  GroupAthlete.create(
    athlete_id: Athlete.order(Arel.sql('RANDOM()')).first.id,
    group_id: Group.order(Arel.sql('RANDOM()')).first.id
  )
end

15.times do
  Facility.create(
    address: Faker::Address.street_address,
    name: "Stadium of #{Faker::Address.city}"
  )
end

# Track events for 'short distance runners because 5k is enough!!!!'
races = ['50m', '60m', '100m', '150m', '200m', '250m', '300m', '350m', '400m', '400m hurdles', '800m', '1500m', '5k',
         '1 hurdle', '3 hurdles', '6 hurdles']
races.each do |race|
  value = Race.create(name: race)
  value.build_discipline
  value.save
end

j1 = Jump.create(name: 'Long jump')
j1.build_discipline
j1.save
j2 = Jump.create(name: 'High jump')
j2.build_discipline
j2.save
j3 = Jump.create(name: 'Triple jump')
j3.build_discipline
j3.save
j4 = Jump.create(name: 'Pole vault')
j4.build_discipline
j4.save
w1 = Weigth.create(name: 'Lunges')
w1.build_discipline
w1.save
w2 = Weigth.create(name: 'Bench press')
w2.build_discipline
w2.save
w3 = Weigth.create(name: 'Squat')
w3.build_discipline
w3.save
t1 = Throw.create(name: 'Shot put')
t1.build_discipline
t1.save
t2 = Throw.create(name: 'Discus')
t2.build_discipline
t2.save
t3 = Throw.create(name: 'Javelin')
t3.build_discipline
t3.save

# Individual and groups trainings with some exercices (TrainingDiscipline)
150.times do
  rand_hour = rand(15..20)
  rand_min = [0o0, 30].sample
  choices = [Group.order(Arel.sql('RANDOM()')).first, Athlete.order(Arel.sql('RANDOM()')).first]
  choice = choices.sample
  training = Training.create(
    facility_id: Facility.order(Arel.sql('RANDOM()')).first.id,
    trainable: choice,
    date: "#{Faker::Date.between(from: Date.today - 150.days, to: Date.today + 100.days)} #{rand_hour}:#{rand_min}",
    description: Faker::TvShows::Suits.quote
  )
  training_disciplines = rand(1..10)
  order = 0
  training_disciplines.times do
    choice = Discipline.order(Arel.sql('RANDOM()')).first
    TrainingDiscipline.create(
      training_id: training.id,
      disciplinable_id: choice.disciplinable_id,
      disciplinable_type: choice.disciplinable_type,
      sets_num: rand(1..10),
      reps_num: rand(1..10),
      exercice_order: order
    )
    order += 1
  end
end

# Individual and groups trainings with some exercices (TrainingDiscipline) but without Facility
50.times do
  rand_hour = rand(15..20)
  rand_min = [0o0, 30].sample
  choices = [Group.order(Arel.sql('RANDOM()')).first, Athlete.order(Arel.sql('RANDOM()')).first]
  choice = choices.sample
  training = Training.create(
    trainable: choice,
    date: "#{Faker::Date.between(from: Date.today - 60.days, to: Date.today + 60.days)} #{rand_hour}:#{rand_min}",
    description: Faker::TvShows::Suits.quote
  )
  training_disciplines = rand(1..10)
  order = 0
  training_disciplines.times do
    choice = Discipline.order(Arel.sql('RANDOM()')).first
    TrainingDiscipline.create(
      training_id: training.id,
      disciplinable_id: choice.disciplinable_id,
      disciplinable_type: choice.disciplinable_type,
      sets_num: rand(1..10),
      reps_num: rand(1..10),
      exercice_order: order
    )
    order += 1
  end
end

80.times do
  Notification.create(user_id: User.order(Arel.sql('RANDOM()')).first.id, content: Faker::Movies::StarWars.quote)
end
