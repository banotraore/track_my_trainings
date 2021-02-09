# frozen_string_literal: true

class User < ActiveRecord::Base
  self.implicit_order_column = 'created_at' # Order Users by date since I'm using UUID
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_one :athlete, dependent: :destroy
  has_one :coach, dependent: :destroy

  validates :first_name, presence: :true
  validates :last_name, presence: :true
  validates :username, uniqueness: { case_sensitive: false }

  before_save { self.first_name = first_name.titleize }
  before_save { self.last_name = last_name.titleize }
  before_save :downcase_username, if: :username?

  after_create :create_athlete

  private

  def downcase_username
    self.username = username.downcase if username.present?
  end

  # If you have a body you are an athlete. So Every user has an athlete
  def create_athlete
    Athlete.create(user_id: id)
  end
end
