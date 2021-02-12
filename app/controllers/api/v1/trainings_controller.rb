class Api::V1::TrainingsController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :find_trainable, only: [:create]
  before_action :set_training, only: [:update]

  def index
    # by default get the personnal trainings and the groups trainings of an athlete
    @trainings = current_api_v1_user.athlete.group_trainings.order(date: :desc) + current_api_v1_user.athlete.trainings.order(date: :desc)
    # if it's a coach add the groups trainings
    @trainings += current_api_v1_user.coach.group_trainings.order(date: :desc) if current_api_v1_user.coach
  end

  def create
    @training = @trainable.trainings.build(training_params)

    @training.training_disciplines.build(training_disciplines_params[:training_disciplines_attributes])

    if @training.save!
      if  @training.trainable_type == 'Group'
        NotificationsJob.perform_later(@training)
      end
      render :create, message: 'Training created', status: :ok
    else
      render json: { errors: @training.errors.full_messages, message: 'Trouble during the process, Something went wrong !' }, status: :unprocessable_entity
    end
  end

  def create_multiple_record
    ActiveRecord::Base.transaction do
      trainings = params[:training][:trainable_id].each do |id|
        @trainable = Athlete.find_by_id(id)

        @training = @trainable.trainings.build(training_params)
        @training.training_disciplines.build(training_disciplines_params[:training_disciplines_attributes])
        @training.save!
        NotificationsJob.perform_later(@training)
      end
      if !trainings.empty?
        render json: { training: trainings, message: 'Trainings created', status: :created }

      else
        render json: { errors: 'Trouble during the process, Something went wrong !', message: 'Trouble during the process, Something went wrong !' }, status: :unprocessable_entity

      end
    rescue ActiveRecord::Rollback
      render json: { errors: 'Trouble during the process, Something went wrong !', message: 'Trouble during the process, Something went wrong !' }, status: :unprocessable_entity
    end

  end

  def update
    if @training.update(training_update_params)
      render json: { status: 'SUCCESS', message: 'Training was successfully updated.', training: @training }
    else
      render json: { status: :unprocessable_entity, message: @training.errors.inspect }
    end
  end

  def download_training
    DownloadCalendarJob.perform_later(params[:id])
    head :accepted
  end

  private

  def find_trainable
    if params[:training][:trainable_type] == 'Athlete'
      @trainable = Athlete.find_by_id(current_api_v1_user.athlete.id)
    elsif params[:training][:trainable_type] == 'Group'
      @trainable = Group.find_by_id(params[:training][:trainable_id])
    end
  end

  def set_training
    @training = Training.find(params[:id])
  end
  
  # Needed to split the params on 2 method to avoid the training_disciplines to be saved twice
  def training_params
    params.require(:training).permit(:trainable_id, :trainable_type, :facility_id, :date, :description, :on_spikes)
  end

  def training_disciplines_params
    params.require(:training).permit(training_disciplines_attributes: %i[id training_id disciplinable_id
                                                                         disciplinable_type sets_num reps_num exercice_order])
  end


  
  def training_update_params
    params.require(:training).permit(:id, :trainable_id, :trainable_type, :facility_id, :date, :description, :on_spikes, training_disciplines_attributes: %i[id training_id disciplinable_id
      disciplinable_type sets_num reps_num exercice_order])
  end
end
