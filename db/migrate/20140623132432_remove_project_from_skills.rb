class RemoveProjectFromSkills < ActiveRecord::Migration
  def change
    remove_column :skills, :project, :intger
  end
end
