class CreateFishes < ActiveRecord::Migration[6.1]
  def change
    create_table :fishes do |t|
      t.string :name
      t.string :description
      t.string :size
      t.string :img_url
      t.integer :category_id

      t.timestamps
    end
  end
end
