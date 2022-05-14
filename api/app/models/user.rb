class User < ApplicationRecord
  has_many :logs

  has_many :followers, through: :following_users
  has_many :following_users, foreign_key: :user_id, class_name: "Follow"

  has_many :followees, through: :followed_users
  has_many :followed_users, foreign_key: :user_id, class_name: "Follow"
end
