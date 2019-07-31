class AdminSerializer < ActiveModel::Serializer
  attributes :id, :email

  belongs_to :store
end
