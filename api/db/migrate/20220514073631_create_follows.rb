class CreateFollows < ActiveRecord::Migration[7.0]
  def change
    create_table :follows do |t|
      t.string :status, default: "pending"
      t.integer :follower_id, null: false
      t.integer :followee_id, null: false
      t.foreign_key(:users, column: :follower_id, primary_key: "id")
      t.foreign_key(:users, column: :followee_id, primary_key: "id")
      t.timestamps
    end
  end
end
