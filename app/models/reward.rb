class Reward < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true
  validates :point_value, presence: true
  validates :store_id, presence: true

  belongs_to :store
  has_many :exchanges
  has_many :users, through: :exchanges
end
