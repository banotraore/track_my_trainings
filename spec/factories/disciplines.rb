FactoryBot.define do
  factory :discipline do
    race_discipline
    official { false }
    
    trait :jump_discipline do
      association :disciplinable, factory: :jump
    end
    trait :race_discipline do
      association :disciplinable, factory: :race
    end
    trait :weigth_discipline do
      association :disciplinable, factory: :weigth
    end
    trait :throw_discipline do
      association :disciplinable, factory: :throw
    end
  end
end
