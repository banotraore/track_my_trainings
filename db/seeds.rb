User.destroy_all

Team.destroy_all

10.times do
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

15.times do
  teams = [Faker::Sports::Basketball.team, Faker::Sports::Football.team]
  Team.create(name: teams.sample)
end

15.times do
  teams = [Faker::Sports::Basketball.team, Faker::Sports::Football.team]
  Team.create(name: teams.sample)
end