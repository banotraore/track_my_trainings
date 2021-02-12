class GroupAthlete < ApplicationRecord
  self.implicit_order_column = 'created_at'
  belongs_to :group
  belongs_to :athlete

  # Validate that an athlete can only be added one time to a group
  validates :athlete_id, uniqueness: { scope: :group_id,
                                       message: "You're already in this group" }
end