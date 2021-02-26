json.cache! @team do |json|
  json.team do
    json.id @team.id
    json.name @team.name
    json.slug @team.slug

    json.groups_count @team.groups.size
    json.groups @team.groups do |group|
      json.id group.id
      json.name group.name
      if group.group_coaches.exists?
        json.coaches group.group_coaches do |group_coach|
          json.first_name group_coach.coach.user.first_name
        end
      end
    end
  end
end
