FactoryBot.define do
  factory :facility do
    name { Faker::Address.street_name }
    address { Faker::Address.full_address }
  end
end
