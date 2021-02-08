class Facility < ApplicationRecord
  validates :name, presence: :true
  validates :address, presence: :true
end
