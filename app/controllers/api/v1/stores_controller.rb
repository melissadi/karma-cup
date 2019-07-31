class Api::V1::StoresController < ApplicationController
  before_action :authorize_user, except: [:index, :show]

  def index
    render json: Store.all
  end

  def show
    store = Store.find(params[:id])
  end

end
