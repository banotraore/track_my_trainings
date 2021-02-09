require 'rails_helper'

RSpec.describe Race, type: :model do
  describe 'validations' do
    subject { create(:race) }

    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name).case_insensitive }
  end
end
