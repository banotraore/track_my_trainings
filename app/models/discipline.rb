class Discipline < ApplicationRecord
  self.implicit_order_column = 'created_at' 
  belongs_to :disciplinable, polymorphic: true
end
