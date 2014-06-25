class AddProjectIdToSkills < ActiveRecord::Migration
  def change
    add_column :skills, :project_id, :integer
  end
end
