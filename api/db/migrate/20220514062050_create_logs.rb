class CreateLogs < ActiveRecord::Migration[7.0]
  def change
    create_table :logs do |t|
      t.datetime :time
      t.float :amount
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
