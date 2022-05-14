class FollowsController < ApplicationController
  before_action :set_follow, only: %i[ show edit update destroy ]

  # GET /follows or /follows.json
  def index
    @follows = Follow.all
  end

  # GET /follows/1 or /follows/1.json
  def show
  end

  # GET /follows/new
  def new
    @follow = Follow.new
  end

  # GET /follows/1/edit
  def edit
  end

  # POST /follows or /follows.json
  def create
    logger.debug follow_params
    @follow = Follow.new(
      :status => follow_params[:status],
      :followee => User.find(follow_params[:followee_id]),
      :follower => User.find(follow_params[:follower_id]),
    )

    respond_to do |format|
      if @follow.save
        format.html { redirect_to follow_url(@follow), notice: "Follow was successfully created." }
        format.json { render :show, status: :created, location: @follow }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @follow.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /follows/1 or /follows/1.json
  def update
    respond_to do |format|
      if @follow.update(follow_params)
        format.html { redirect_to follow_url(@follow), notice: "Follow was successfully updated." }
        format.json { render :show, status: :ok, location: @follow }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @follow.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /follows/1 or /follows/1.json
  def destroy
    @follow.destroy

    respond_to do |format|
      format.html { redirect_to follows_url, notice: "Follow was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_follow
    @follow = Follow.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def follow_params
    params.require(:follow).permit(:status, :follower_id, :followee_id)
  end
end
