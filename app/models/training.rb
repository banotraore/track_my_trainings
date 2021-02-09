class Training < ApplicationRecord
  belongs_to :trainable, polymorphic: true
  belongs_to :facility, optional: true

  has_many :training_disciplines, dependent: :destroy

  validates :date, presence: true
end
