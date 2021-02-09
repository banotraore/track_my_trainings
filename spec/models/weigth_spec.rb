require 'rails_helper'

RSpec.describe Weigth, type: :model do
  describe 'associations' do
    it { should have_one(:discipline) }
  end
  
  describe 'validations' do
    subject { create(:weigth) }

    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name).case_insensitive }
  end
end
