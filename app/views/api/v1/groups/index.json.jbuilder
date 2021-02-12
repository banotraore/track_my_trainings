json.groups @groups do |group|
  json.id group.id
  json.name "#{group.team.name} - #{group.name}"
  json.team_id group.team_id
  json.team_name group.team.name
  json.team_slug group.team.slug
end
