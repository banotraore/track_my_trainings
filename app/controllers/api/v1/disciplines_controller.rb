class Api::V1::DisciplinesController < ApplicationController
  def index
    @disciplines = Discipline.all
  end
end
