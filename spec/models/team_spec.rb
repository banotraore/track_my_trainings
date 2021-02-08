require 'rails_helper'

RSpec.describe Team, type: :model do

  describe "associations" do
    it { should have_many(:groups) } 
  end
  
  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name).case_insensitive }
  end
end
