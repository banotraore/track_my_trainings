class Athlete < ApplicationRecord
  belongs_to :user

  has_many :group_athletes, dependent: :destroy
  has_many :groups, through: :group_athletes, dependent: :destroy
  has_many :teams, through: :groups, dependent: :destroy
  has_many :coaches, through: :groups, source: :group_coaches, dependent: :destroy
end
