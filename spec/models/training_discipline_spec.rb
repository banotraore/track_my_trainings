require 'rails_helper'

RSpec.describe TrainingDiscipline, type: :model do
  subject(:exercice) { create(:race_training_discipline) }
  subject(:bad_exercice) { build(:unvalid_race_training_discipline) }

  describe 'associations' do
    it { should belong_to(:training).optional }
    it { should belong_to(:disciplinable).optional }
  end

  describe 'validations' do
    it { should validate_presence_of(:sets_num) }
    it { should validate_presence_of(:reps_num) }
    it { should validate_presence_of(:exercice_order) }

    it { should validate_numericality_of(:sets_num).only_integer.is_greater_than(0).is_less_than(51) }
    it { should validate_numericality_of(:reps_num).only_integer.is_greater_than(0).is_less_than(51) }
    it { should validate_numericality_of(:exercice_order).only_integer.is_greater_than_or_equal_to(0) }
    it { should validate_uniqueness_of(:exercice_order).scoped_to(:training_id) }

    it { expect(exercice).to be_valid }
    it { expect(bad_exercice).to_not be_valid }
  end
end
