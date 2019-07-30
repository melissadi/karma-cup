class CreateStores < ActiveRecord::Migration[5.2]
  def change
    create_table :stores do |t|
      t.string :name, null: false
      t.string :description, null: false
      t.text :location, null: false

      t.timestamps null:false      
    end
  end
end
