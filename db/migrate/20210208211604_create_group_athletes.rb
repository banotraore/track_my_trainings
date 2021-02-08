class CreateGroupAthletes < ActiveRecord::Migration[6.1]
  def change
    create_table :group_athletes, id: :uuid do |t|
      t.references :group, null: false, foreign_key: true, type: :uuid
      t.references :athlete, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
