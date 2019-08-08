class Api::V1::ExchangesController < ApplicationController
  before_action :authenticate_admin!, except: [:index, :show, :update, :create]

  def index
    @exchanges = Exchange.all
    render json: @exchanges
  end

  def show
    id = params[:id]
    render json: Exchange.find(id)
  end

  def create
    @exchange = Exchange.create!(exchange_params)
    render json: @exchange
  end

  def update
    @exchange = Exchange.find(params[:id])
    @exchange.update!(exchange_params)
    render json: @exchange
  end

  private

  def exchange_params
    params.require(:exchange).permit(:store_id, :reward_id, :user_id, :points_given, :points_redeemed)
  end

end
