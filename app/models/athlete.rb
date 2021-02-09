class Athlete < ApplicationRecord
  self.implicit_order_column = 'created_at'
  belongs_to :user

  has_many :group_athletes, dependent: :destroy
  has_many :groups, through: :group_athletes, dependent: :destroy
  has_many :teams, through: :groups, dependent: :destroy
  has_many :coaches, through: :groups, source: :group_coaches, dependent: :destroy
  has_many :group_trainings, through: :groups, source: :trainings, dependent: :destroy

  has_many :trainings, as: :trainable, dependent: :destroy
end
