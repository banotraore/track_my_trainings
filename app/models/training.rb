class Training < ApplicationRecord
  self.implicit_order_column = 'created_at' 
  belongs_to :trainable, polymorphic: true
  belongs_to :facility, optional: true

  has_many :training_disciplines, dependent: :destroy

  validates :date, presence: true

  def is_coaching?(user)
    # check if a user is a coach for that specific training session
    if user.coach && trainable_type == 'Group'
      trainable.group_coaches.exists?(coach: user.coach)
    end 
  end
end
