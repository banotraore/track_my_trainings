class Training < ApplicationRecord
  belongs_to :trainable, polymorphic: true
  belongs_to :facility, optional: true

  validates :date, presence: true
end
