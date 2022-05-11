class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.string :firstname
      t.string :lastname
      t.string :email
      t.string :phonenumber
      t.string :messagetext

      t.timestamps
    end
  end
end
