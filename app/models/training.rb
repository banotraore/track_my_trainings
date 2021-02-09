class Training < ApplicationRecord
  self.implicit_order_column = 'created_at'
  belongs_to :trainable, polymorphic: true
  belongs_to :facility, optional: true

  has_many :training_disciplines, -> { order(exercice_order: :asc) }, dependent: :destroy

  validates :date, presence: true

  accepts_nested_attributes_for :training_disciplines,
                                reject_if: ->(p) { p.values.all?(&:blank?) },
                                allow_destroy: true

  def is_coaching?(user)
    # check if a user is a coach for that specific training session
    trainable.group_coaches.exists?(coach: user.coach) if user.coach && trainable_type == 'Group'
  end
end
