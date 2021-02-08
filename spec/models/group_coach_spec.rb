require 'rails_helper'

RSpec.describe GroupCoach, type: :model do
  describe 'associations' do
    it { should belong_to(:group) }
    it { should belong_to(:coach) }
  end

  describe 'validations' do
    subject { create(:group_coach) }
    it { should validate_uniqueness_of(:coach_id).case_insensitive.scoped_to(:group_id) }
  end
end
