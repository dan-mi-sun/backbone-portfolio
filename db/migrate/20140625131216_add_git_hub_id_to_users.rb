class AddGitHubIdToUsers < ActiveRecord::Migration
  def change
    add_column :users, :github_id, :integer
  end
end
