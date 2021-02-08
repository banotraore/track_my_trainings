class Group < ApplicationRecord
  belongs_to :team

  validates :name, presence: :true, uniqueness: { case_sensitive: false, scope: :team_id }
end
