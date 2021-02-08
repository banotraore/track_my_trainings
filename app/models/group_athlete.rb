class GroupAthlete < ApplicationRecord
  belongs_to :group
  belongs_to :athlete

  validates_uniqueness_of :athlete_id, scope: :group_id
end
