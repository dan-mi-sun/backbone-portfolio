class Project < ActiveRecord::Base
  belongs_to :project
  has_many :skills

  accepts_nested_attributes_for :skills, allow_destroy: true

  def as_json(options = nil)
    options.merge!(Project.default_json_options) if options
    super(options)
  end

  def self.default_json_options
    {
      :include => {
        :skills => { :only => [:id, :name, :project_id] }
      }, :except => [:created_at, :updated_at] 
    }
  end
end
