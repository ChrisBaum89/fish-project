class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.string :name
      t.string :reviewtext
      t.integer :stars

      t.timestamps
    end
  end
end
