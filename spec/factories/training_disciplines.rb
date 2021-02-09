FactoryBot.define do
  factory :training_discipline do
    for_race
    sets_num { 1 }
    reps_num { 1 }
    exercice_order { 1 }

    trait :for_race do
      association :disciplinable, factory: :race
      association :training, factory: :training
    end

    factory :race_training_discipline do
      association :disciplinable, factory: :race
      association :training, factory: :training
    end

    factory :unvalid_race_training_discipline do
      association :disciplinable, factory: :race
      association :training, factory: :training
      exercice_order { nil }
    end
  end
end
