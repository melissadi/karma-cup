class Exchange < ApplicationRecord
  validates :user_id, presence: true
  validates :points_given, presence: true
  validates :points_redeemed, presence: true
  validates :store_id, presence: true

  belongs_to :user
  belongs_to :store
  belongs_to :reward, optional: true
end
