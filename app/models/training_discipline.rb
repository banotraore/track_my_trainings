class TrainingDiscipline < ApplicationRecord
  belongs_to :training, optional: true
  belongs_to :disciplinable, polymorphic: true, optional: true

  has_many :performances, dependent: :destroy

  validates :sets_num, presence: true, numericality: { only_integer: true, greater_than: 0, less_than: 51 }
  validates :reps_num, presence: true, numericality: { only_integer: true, greater_than: 0, less_than: 51 }
  validates :exercice_order, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  # Validate that the exerice order is unique during a training session
  validates_uniqueness_of :exercice_order, scope: :training_id
end
