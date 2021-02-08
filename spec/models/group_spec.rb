require 'rails_helper'

RSpec.describe Group, type: :model do
  describe 'associations' do
    it { should belong_to(:team) }
    it { should have_many(:group_athletes) }
  end

  describe 'validations' do
    subject { build(:group) }

    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name).case_insensitive.scoped_to(:team_id) }
  end
end
