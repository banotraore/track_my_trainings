class Weigth < ApplicationRecord
    self.implicit_order_column = 'created_at' 
    has_one :discipline, as: :disciplinable, dependent: :destroy

    validates :name, presence: :true, uniqueness: { case_sensitive: false }

    before_save { self.name = name.titleize }
end
