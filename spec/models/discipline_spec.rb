require 'rails_helper'

RSpec.describe Discipline, type: :model do
  subject(:run) { create(:discipline) }

  describe 'associations' do
    it { should belong_to(:disciplinable) }
  end
  describe 'validations' do
    it { expect(run).to be_valid }
    it { is_expected.to have_attributes(official: run.official) }
  end
end
