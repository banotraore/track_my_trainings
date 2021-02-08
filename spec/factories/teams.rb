FactoryBot.define do
  factory :team do
    name { Faker::Sports::Football.team }
  end
end
