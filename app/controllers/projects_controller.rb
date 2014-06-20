class ProjectsController < ApplicationController

  def index
    render :json => Project.all
  end

  def create
    @project = Project.create(allowed_params)
    @project.save
    render :json => @project
  end

  private
  def allowed_params
    params.require(:project).permit(:title, :url)
  end

end
