class Athlete < ApplicationRecord
  self.implicit_order_column = 'created_at'
  belongs_to :user

  has_many :group_athletes, dependent: :destroy
  has_many :groups, through: :group_athletes, dependent: :destroy
  has_many :teams, -> {  order(name: :asc).distinct }, through: :groups, dependent: :destroy
  has_many :group_coaches, through: :groups, dependent: :destroy
  has_many :coaches, -> { includes(:user).distinct }, through: :group_coaches, source: :coach, dependent: :destroy

  has_many :group_trainings, lambda {
                               includes(%i[facility training_disciplines trainable])
                             }, through: :groups, source: :trainings, dependent: :destroy

  has_many :trainings, -> { includes(%i[facility training_disciplines]) }, as: :trainable, dependent: :destroy

  # only show the next training of an athlete
  def last_training
    train = group_trainings.where('trainings.date <= ?',
                                  DateTime.now) + trainings.where('trainings.date <= ?', DateTime.now)
    train.sort_by! { |t| t.date }.last
  end

  # only show the next training of an athlete
  def next_training
    train = group_trainings.where('trainings.date >= ?',
                                  DateTime.now) + trainings.where('trainings.date >= ?', DateTime.now)
    train.sort_by! { |t| t.date }.first
  end
end
