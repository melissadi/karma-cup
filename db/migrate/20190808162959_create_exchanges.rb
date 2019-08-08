class CreateExchanges < ActiveRecord::Migration[5.2]
  def change
    create_table :exchanges do |t|
      t.integer :points_given, null: false, default: 0
      t.integer :points_redeemed, null: false, default: 0

      t.belongs_to :user
      t.belongs_to :store
      t.belongs_to :reward

      t.timestamps null: false
    end
  end
end
