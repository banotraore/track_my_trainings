class Group < ApplicationRecord
  self.implicit_order_column = 'created_at' 
  belongs_to :team

  has_many :group_athletes, dependent: :destroy
  has_many :group_coaches, dependent: :destroy
  has_many :trainings, as: :trainable, dependent: :destroy

  validates :name, presence: :true, uniqueness: { case_sensitive: false, scope: :team_id }

  before_save { self.name = name.titleize }
end
