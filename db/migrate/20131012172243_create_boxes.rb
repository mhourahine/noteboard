class CreateBoxes < ActiveRecord::Migration
  def change
    create_table :boxes do |t|
      t.string :title
      t.string :content
      t.string :top
      t.string :left
      t.string :width
      t.string :height

      t.timestamps
    end
  end
end
