class CreateGroupCoaches < ActiveRecord::Migration[6.1]
  def change
    create_table :group_coaches, id: :uuid do |t|
      t.references :group, null: false, foreign_key: true, type: :uuid
      t.references :coach, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
