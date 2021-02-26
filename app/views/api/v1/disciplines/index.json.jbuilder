json.cache! @disciplines do |json|
  json.disciplines @disciplines do |discipline|
    json.disciplinable_id discipline.disciplinable_id
    json.disciplinable_type discipline.disciplinable_type
    json.name discipline.disciplinable.name
    json.official discipline.official
  end
end
