class CreateJumps < ActiveRecord::Migration[6.1]
  def change
    create_table :jumps, id: :uuid do |t|
      t.string :name

      t.timestamps
    end
  end
end
