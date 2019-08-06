class Api::V1::RewardsController < ApplicationController
  before_action :authenticate_admin! || :authenticate_user!

  def index
    @rewards = Reward.all
    render json: @rewards
  end

  def show
    id = params[:id]
    render json: Reward.find(id)
  end

  def create
    @reward = Reward.create!(reward_params)
    render json: @reward
  end

  def update
    @reward = Reward.find(params[:id])
    @reward.update!(reward_params)
    render json: @reward
  end

  private

  def reward_params
    params.require(:reward).permit(:name, :description, :point_value, :store_id, :image)
  end

end
