class Discipline < ApplicationRecord
  belongs_to :disciplinable, polymorphic: true
end
