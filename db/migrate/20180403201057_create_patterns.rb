class CreatePatterns < ActiveRecord::Migration[5.1]
  def change
    create_table :patterns do |t|
      t.string :name, null: false
      t.integer :right_hand, array: true
      t.integer :left_hand, array: true
      t.float :subdivision, null: false
      t.integer :time_repeated
      t.boolean :is_alt

      t.timestamps
    end
  end
end
