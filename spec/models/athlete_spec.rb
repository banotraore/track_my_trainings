require 'rails_helper'

RSpec.describe Athlete, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should have_many(:group_athletes) }
    it { should have_many(:groups).through(:group_athletes) }
    it { should have_many(:teams).through(:groups) }
    it { should have_many(:group_coaches).through(:groups) }
    it { should have_many(:coaches).through(:group_coaches) }
    it { should have_many(:group_trainings).through(:groups) }
    it { should have_many(:trainings) }
  end
end
