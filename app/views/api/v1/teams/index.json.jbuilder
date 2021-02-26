json.cache! @teams do |json|
  json.teams @teams do |team|
    json.id team.id
    json.name team.name
    json.slug team.slug
  end
end
