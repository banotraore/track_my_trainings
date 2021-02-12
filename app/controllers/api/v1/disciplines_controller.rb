class Api::V1::DisciplinesController < ApplicationController
  before_action :authenticate_api_v1_user!
  def index
    @disciplines = Discipline.all
  end
end
