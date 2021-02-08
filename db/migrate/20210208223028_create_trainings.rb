class CreateTrainings < ActiveRecord::Migration[6.1]
  def change
    create_table :trainings, id: :uuid do |t|
      t.references :trainable, polymorphic: true, null: false, type: :uuid
      t.datetime :date
      t.references :facility, null: true, foreign_key: true, type: :uuid
      t.text :description
      t.boolean :on_spikes, default: false

      t.timestamps
    end
  end
end
