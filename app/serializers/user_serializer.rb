class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :points

  has_many :exchanges
end
