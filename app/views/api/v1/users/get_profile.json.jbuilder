json.user do
  json.id @user.id
  json.email @user.email
  json.first_name @user.first_name
  json.last_name @user.last_name
  json.username @user.username

  if @user.athlete.teams.exists?
    json.athlete_teams @user.athlete.teams do |team|
      json.id team.id
      json.name team.name
      json.slug team.slug
      json.athletes_count team.athletes.count
      json.groups team.groups.user_in_group(@user) do |group|
        json.id group.id
        json.name group.name
      end
    end
  end
end

json.teams @teams do |team|
  json.id team.id
  json.name team.name
  json.slug team.slug
  if team.athletes
    json.athletes team.athletes do |athlete|
      json.id athlete.id
    end

  end
end
