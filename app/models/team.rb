class Team < ApplicationRecord
  has_many :groups, dependent: :destroy
  validates :name, presence: :true, uniqueness: { case_sensitive: false }
end
