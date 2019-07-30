class DropRewardsTable < ActiveRecord::Migration[5.2]
  def up
    drop_table :rewards
  end

  def down
    create_table :rewards do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.integer :point_value, null: false

      t.timestamps null:false
    end
  end
end
