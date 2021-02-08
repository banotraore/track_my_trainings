require 'rails_helper'

RSpec.describe Facility, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:address) }
  end
end
