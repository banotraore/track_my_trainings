class Race < ApplicationRecord
    self.implicit_order_column = 'created_at' 
    validates :name, presence: :true, uniqueness: { case_sensitive: false }

    before_save { self.name = name.titleize }
end
