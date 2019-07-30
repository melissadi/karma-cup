class Reward < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true
  validates :point_value, presence: true

  belongs_to :store
end
