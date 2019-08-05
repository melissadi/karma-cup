class Api::V1::StoresController < ApplicationController
  before_action :authenticate_admin! || :authenticate_user!

  def index
    render json: Store.all
  end

  def show
    @store = Store.find(params[:id])
    render json: @store
  end

end
