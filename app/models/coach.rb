class Coach < ApplicationRecord
  self.implicit_order_column = 'created_at'
  belongs_to :user

  has_many :group_coaches, dependent: :destroy
  has_many :groups, -> { includes([:team]) }, through: :group_coaches, dependent: :destroy
  has_many :teams, -> { order(name: :asc).distinct }, through: :groups, dependent: :destroy
  has_many :group_athletes, through: :groups, dependent: :destroy
  has_many :athletes, -> { includes(:user).distinct }, through: :group_athletes, source: :athlete, dependent: :destroy

  has_many :group_trainings, lambda {
                               includes(%i[facility training_disciplines trainable])
                             }, through: :groups, source: :trainings, dependent: :destroy

  # only show the next training of an athlete
  def next_coach_training
    train = group_trainings.where('trainings.date >= ?',
                                  DateTime.now)
    train.min_by { |t| t.date }
  end

  def last_coach_training
    train = group_trainings.where('trainings.date <= ?',
                                  DateTime.now)
    train.max_by { |t| t.date }
  end

  # Get all individuals athletes workouts
  def athletes_special_trainings
    Training.includes(:facility, :training_disciplines ,:trainable).where(trainable_id: athletes)
  end
end
