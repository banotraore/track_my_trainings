# frozen_string_literal: true

class User < ActiveRecord::Base
  self.implicit_order_column = 'created_at' # Order Users by date since I'm using UUID
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  validates :first_name, presence: :true
  validates :last_name, presence: :true
  validates :username, uniqueness: { case_sensitive: false }
end
