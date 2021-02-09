class CreateTrainingDisciplines < ActiveRecord::Migration[6.1]
  def change
    create_table :training_disciplines, id: :uuid do |t|
      t.references :training, null: false, foreign_key: true, type: :uuid
      t.references :disciplinable, polymorphic: true, null: false, type: :uuid
      t.integer :sets_num, default: 1
      t.integer :reps_num, default: 1
      t.integer :exercice_order

      t.timestamps
    end
  end
end
