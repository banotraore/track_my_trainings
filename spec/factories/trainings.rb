FactoryBot.define do
  factory :training do
    for_group
    date { DateTime.now }
    facility
    description { Faker::Lorem.paragraphs(number: 1) }
    on_spikes { false }

    factory :training_without_facility do
      facility { nil }
    end
    factory :training_without_date do
      date { nil }
    end
    trait :for_group do
      association :trainable, factory: :group
    end

    trait :for_athlete do
      association :trainable, factory: :athlete
    end
  end
end
