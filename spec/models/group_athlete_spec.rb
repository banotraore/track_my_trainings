require 'rails_helper'

RSpec.describe GroupAthlete, type: :model do
  describe 'associations' do
    it { should belong_to(:group) }
    it { should belong_to(:athlete) }
  end

  describe 'validations' do
    subject { create(:group_athlete) }
    it {
      should validate_uniqueness_of(:athlete_id).case_insensitive.scoped_to(:group_id).with_message("You're already in this group")
    }
  end
end
