FactoryBot.define do
  factory :group do
    name { Faker::Name.unique.name }
    team
  end
end
