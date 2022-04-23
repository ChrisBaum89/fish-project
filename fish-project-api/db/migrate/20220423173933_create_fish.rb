class CreateFish < ActiveRecord::Migration[6.1]
  def change
    create_table :fish do |t|
      t.string :name
      t.string :description
      t.string :size
      t.integer :category_id

      t.timestamps
    end
  end
end
