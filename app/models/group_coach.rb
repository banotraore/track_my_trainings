class GroupCoach < ApplicationRecord
  belongs_to :group
  belongs_to :coach

  # Validate that a coach can only be added one time to a group
  validates_uniqueness_of :coach_id, scope: :group_id
end
