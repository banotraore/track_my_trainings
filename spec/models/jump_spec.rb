require 'rails_helper'

RSpec.describe Jump, type: :model do
  describe 'validations' do
    subject { create(:jump) }

    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name).case_insensitive }
  end
end
