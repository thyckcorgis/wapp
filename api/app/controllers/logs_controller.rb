class LogsController < ApplicationController
  before_action :set_log, only: %i[ show edit update destroy ]
  before_action :set_user, only: %i[ index new create edit update destroy ]

  # GET /logs or /logs.json
  def index
    @logs = @user.logs
  end

  # GET /logs/1 or /logs/1.json
  def show
  end

  # GET /logs/new
  def new
    @log = Log.new
    @log[:user_id] = params[:user_id]
  end

  # GET /logs/1/edit
  def edit
  end

  # POST /logs or /logs.json
  def create
    @log = Log.new(
      :time => log_params[:time],
      :amount => log_params[:amount],
      :user => @user,
    )

    respond_to do |format|
      if @log.save
        format.html { redirect_to user_logs_path, notice: "Log was successfully created." }
        format.json { render :show, status: :created, location: @log }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @log.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /logs/1 or /logs/1.json
  def update
    respond_to do |format|
      if @log.update(log_params)
        format.html { redirect_to user_logs_path(@user), notice: "Log was successfully updated." }
        format.json { render :show, status: :ok, location: @log }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @log.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /logs/1 or /logs/1.json
  def destroy
    @log.destroy

    respond_to do |format|
      format.html { redirect_to user_logs_path(@user), notice: "Log was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_log
    @log = Log.find(params[:id])
  end

  def set_user
    @user = User.find(params[:user_id])
  end

  # Only allow a list of trusted parameters through.
  def log_params
    params.require(:log).permit(:time, :amount)
  end
end
