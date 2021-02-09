json.athletes @athletes do |group_athlete|
  json.id group_athlete.athlete.id
  json.name "#{group_athlete.athlete.user.first_name} #{group_athlete.athlete.user.last_name}"
end
