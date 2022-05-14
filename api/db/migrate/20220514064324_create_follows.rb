class CreateFollows < ActiveRecord::Migration[7.0]
  def change
    create_table :follows do |t|
      t.string :status
      t.references :follower, null: false, foreign_key: true
      t.references :followee, null: false, foreign_key: true

      t.timestamps
    end
  end
end
