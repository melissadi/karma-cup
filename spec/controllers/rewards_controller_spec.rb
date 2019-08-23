require 'rails_helper'
require_relative '../support/controller_macros'

RSpec.configure do |config|
  config.include Devise::Test::ControllerHelpers, :type => :controller
  config.extend ControllerMacros, :type => :controller
end

RSpec.describe Api::V1::RewardsController, type: :controller do
  describe "GET #index" do

    context "when a user is logged in", :type => :request do
      login_user
      let!(:store) { FactoryBot.create(:store, id: 2) }
      let!(:rewards) { FactoryBot.create_list(:random_reward, 10) }

      it 'returns all current rewards' do
        get '/api/v1/rewards/'
        expect(JSON.parse(response.body)["rewards"].length).to eq(10)
      end

      it 'returns status code 200' do
        get '/api/v1/rewards/'
        expect(response).to have_http_status(:success)
      end
    end

    context "when an admin is logged in", :type => :request do
      login_admin
      let!(:store) { FactoryBot.create(:store, id: 2) }
      let!(:admin) { FactoryBot.create(:admin, id: 2, store_id: 2) }
      let!(:reward) { FactoryBot.create(:reward) }
      let!(:rewards) { FactoryBot.create_list(:random_reward, 8) }

      it 'returns all rewards the admin has created' do
        get '/api/v1/admins/1/stores/1/rewards/'
        expect(JSON.parse(response.body).length).to eq(1)
      end

      it 'returns status code 200' do
        get '/api/v1/admins/1/stores/1/rewards/'
        expect(response).to have_http_status(:success)
      end
    end
  end

end
