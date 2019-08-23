class AdminSerializer < ActiveModel::Serializer
  attributes :id, :email

  belongs_to :store
  has_many :rewards, serializer: StoreSerializer
end
