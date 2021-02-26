require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'associations' do
    it { should have_one(:athlete) }
    it { should have_one(:coach) }
    it { should have_many(:notifications) }
  end

  describe 'validations' do
    subject { create(:user) }

    it { should validate_presence_of(:first_name) }
    it { should validate_presence_of(:last_name) }
    it { should validate_uniqueness_of(:username).case_insensitive }
  end
end
