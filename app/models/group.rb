class Group < ApplicationRecord
  belongs_to :team

  has_many :group_athletes, dependent: :destroy
  has_many :group_coaches, dependent: :destroy
  validates :name, presence: :true, uniqueness: { case_sensitive: false, scope: :team_id }
end
