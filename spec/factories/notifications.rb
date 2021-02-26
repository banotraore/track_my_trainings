FactoryBot.define do
  factory :notification do
    content { Faker::Movies::StarWars.quote }
    user
    is_open { false }
  end
end
