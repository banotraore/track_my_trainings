class CreateDisciplines < ActiveRecord::Migration[6.1]
  def change
    create_table :disciplines, id: :uuid do |t|
      t.references :disciplinable, polymorphic: true, null: false, type: :uuid
      t.boolean :official

      t.timestamps
    end
  end
end
