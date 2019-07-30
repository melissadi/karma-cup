class Store < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true
  validates :location, presence: true
end
