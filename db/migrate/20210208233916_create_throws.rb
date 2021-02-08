class CreateThrows < ActiveRecord::Migration[6.1]
  def change
    create_table :throws, id: :uuid do |t|
      t.string :name

      t.timestamps
    end
  end
end
