class CreateRewardsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :rewards do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.string :image
      t.integer :point_value, null: false

      t.belongs_to :store

      t.timestamps null: false
    end
  end
end
