class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :name
      t.float :daily
      t.integer :timezone

      t.timestamps
    end
  end
end
