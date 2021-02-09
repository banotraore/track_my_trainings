require 'rails_helper'

RSpec.describe Training, type: :model do
  subject(:group_training) { create(:training) }
  subject(:individual_training) { create(:training, :for_athlete) }
  subject(:group_training_without_facility) { create(:training_without_facility) }
  subject(:group_training_without_date) { build(:training_without_date) }

  describe 'associations' do
    it { should belong_to(:trainable) }
    it { should belong_to(:facility).optional }
    it { should have_many(:training_disciplines) } 
  end

  describe 'validations' do
    it { should validate_presence_of(:date) }
    it { expect(group_training).to be_valid }
    it { expect(individual_training).to be_valid }
    it { expect(group_training_without_facility).to be_valid }
    it { expect(group_training_without_date).to_not be_valid }
  end
end
