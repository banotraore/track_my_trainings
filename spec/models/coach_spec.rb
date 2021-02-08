require 'rails_helper'

RSpec.describe Coach, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should have_many(:group_coaches) }
    it { should have_many(:groups).through(:group_coaches) }
    it { should have_many(:teams).through(:groups) }
    it { should have_many(:athletes).through(:groups) }
    it { should have_many(:group_trainings).through(:groups) }
  end
end