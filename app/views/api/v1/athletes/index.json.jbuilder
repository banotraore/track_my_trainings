json.athletes @athletes do |athlete|
  json.id athlete.id
  json.name "#{athlete.user.first_name} #{athlete.user.last_name}"
end
