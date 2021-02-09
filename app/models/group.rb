class Group < ApplicationRecord
  self.implicit_order_column = 'created_at'
  belongs_to :team

  has_many :group_athletes, dependent: :destroy
  has_many :group_coaches, dependent: :destroy
  has_many :trainings, as: :trainable, dependent: :destroy

  validates :name, presence: :true, uniqueness: { case_sensitive: false, scope: :team_id }

  before_save { self.name = name.titleize }

  # Get all the groups where the given user is an athlete
  scope :user_in_group, ->(user) { includes(:group_athletes).where("group_athletes.athlete_id": user.athlete.id) }
  # Get all the groups where the given user is coaching
  scope :coach_in_group, ->(user) { includes(:group_coaches).where("group_coaches.coach_id": user.coach.id) }
end
