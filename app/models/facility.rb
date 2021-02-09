class Facility < ApplicationRecord
  self.implicit_order_column = 'created_at' 
  validates :name, presence: :true
  validates :address, presence: :true

  before_save { self.name = name.titleize }
end
