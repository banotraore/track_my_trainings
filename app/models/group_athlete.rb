class GroupAthlete < ApplicationRecord
  belongs_to :group
  belongs_to :athlete

  # Validate that an athlete can only be added one time to a group
  validates_uniqueness_of :athlete_id, scope: :group_id
end