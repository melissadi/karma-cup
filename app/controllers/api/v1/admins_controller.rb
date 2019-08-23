class Api::V1::AdminsController < ApplicationController
  before_action :authenticate_admin!

  def show
    id = params[:id]
    render json: Admin.find(id), include: ["store", "store.rewards"]
  end

end
