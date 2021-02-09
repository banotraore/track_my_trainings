require 'rails_helper'

RSpec.describe Throw, type: :model do
  describe 'validations' do
    subject { create(:throw) }

    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name).case_insensitive }
  end
end
