class Api::V1::UsersController < ApplicationController
  before_action :authenticate_admin!, except: [:show, :update]

  def search
    @user = User.where(email: params['search_string'])
    render json: @user
  end

  def update
    @user = User.find(params[:id])
    @user.update!(points: params["points"])
    render json: @user
  end

  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

end
