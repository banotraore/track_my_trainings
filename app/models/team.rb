class Team < ApplicationRecord
  self.implicit_order_column = 'created_at'
  extend FriendlyId
  friendly_id :name, use: :slugged

  has_many :groups, dependent: :destroy
  has_many :athletes, through: :groups, source: :group_athletes, dependent: :destroy
  has_many :coaches, through: :groups, source: :group_coaches, dependent: :destroy
  validates :name, presence: :true, uniqueness: { case_sensitive: false }

  before_save { self.name = name.titleize }
end
