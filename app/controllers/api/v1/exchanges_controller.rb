class Api::V1::ExchangesController < ApplicationController
  before_action :authenticate_any!

  def create
    @exchange = Exchange.create!(exchange_params)
    render json: @exchange
  end

  private

  def exchange_params
    params.require(:exchange).permit(:store_id, :reward_id, :user_id, :points_given, :points_redeemed)
  end

  def authenticate_any!
    if admin_signed_in?
        true
    else
      authenticate_user!
    end
  end

end
