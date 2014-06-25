class ProjectsController < ApplicationController

  def index
    render :json => Project.all.as_json(Project.default_json_options)
  end

  def create
    @project = Project.create!(allowed_params)
    render :json => @project
  end

  def update
    @project = Project.find(params[:id])
    @project.update_attributes(allowed_params)
    render :json => @project
  end

  private
  def allowed_params
    params.require(:project).permit(:id, :title, :url, :body, :image_url,
                                   :skills_attributes => [:id, :name, :_destroy, :project_id])
  end

end
