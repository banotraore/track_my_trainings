class Coach < ApplicationRecord
  self.implicit_order_column = 'created_at'
  belongs_to :user

  has_many :group_coaches, dependent: :destroy
  has_many :groups, through: :group_coaches, dependent: :destroy
  has_many :teams, through: :groups, dependent: :destroy
  has_many :athletes, through: :groups, source: :group_athletes, dependent: :destroy

  has_many :group_trainings, through: :groups, source: :trainings, dependent: :destroy

  # only show the next training of an athlete
  def next_coach_training
    train = group_trainings.where('trainings.date >= ?',
                                  DateTime.now)
    # byebug
    train.min_by { |t| t.date }
  end

  def last_coach_training
    train = group_trainings.where('trainings.date <= ?',
                                  DateTime.now)
    train.max_by { |t| t.date }
  end
end
