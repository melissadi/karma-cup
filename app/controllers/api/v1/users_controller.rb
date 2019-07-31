class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!

  protect_from_forgery unless: -> { request.format.json? }

  def search
    @users = User.where(email: params['search_string'])
    render json: @users
  end

  def index
    @users = User.all
  end

  def show

  end

end
