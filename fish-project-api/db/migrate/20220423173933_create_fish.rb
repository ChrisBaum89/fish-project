class CreateFish < ActiveRecord::Migration[6.1]
  def change
    create_table :fish do |t|
      t.string :name
      t.string :description
      t.string :size
      t.string :vid_url
      t.integer :category_id
      t.integer :number_in_stock
      t.integer :price

      t.timestamps
    end
  end
end
