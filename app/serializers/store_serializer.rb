class StoreSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :location

  has_many :admins
end
