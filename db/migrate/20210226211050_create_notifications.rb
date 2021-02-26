class CreateNotifications < ActiveRecord::Migration[6.1]
  def change
    create_table :notifications, id: :uuid do |t|
      t.string :content
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.boolean :is_opened, default: false

      t.timestamps
    end
  end
end
