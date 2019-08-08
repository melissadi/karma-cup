class ExchangeSerializer < ActiveModel::Serializer
  attributes :id, :points_given, :points_redeemed, :store, :created_at, :reward

  belongs_to :store
  belongs_to :user
  belongs_to :reward, optional: true
end
