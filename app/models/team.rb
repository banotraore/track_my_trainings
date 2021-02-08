class Team < ApplicationRecord
  has_many :groups, dependent: :destroy
  has_many :athletes, through: :groups, source: :group_athletes, dependent: :destroy
  validates :name, presence: :true, uniqueness: { case_sensitive: false }
end
