class RewardSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :point_value, :image

  belongs_to :store
end
