class Notification < ApplicationRecord
  self.implicit_order_column = 'created_at'
  belongs_to :user

  validates :content, presence: :true

  scope :unopened, -> { where(is_opened: false) }
end
