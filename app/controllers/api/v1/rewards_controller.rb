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

end
