class Training < ApplicationRecord
  self.implicit_order_column = 'created_at' 
  belongs_to :trainable, polymorphic: true
  belongs_to :facility, optional: true

  has_many :training_disciplines, dependent: :destroy

  validates :date, presence: true
end
