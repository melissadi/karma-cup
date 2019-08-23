require 'rails_helper'
require_relative '../support/controller_macros'

RSpec.configure do |config|
  config.include Devise::Test::ControllerHelpers, :type => :controller
  config.extend ControllerMacros, :type => :controller
end

RSpec.describe Api::V1::ExchangesController, type: :controller do
  describe "POST#create" do

    context "when user or admin is logged in" do
      login_user
      let!(:store) { FactoryBot.create(:store) }

      it "creates a new exchange" do
        store = Store.first
        user = User.first
        post_json = {
          exchange: {
            points_given: 10,
            points_redeemed: 0,
            store_id: store.id,
            user_id: user.id
          }
        }
        prev_count = Exchange.count
        post(:create, params: post_json)
        expect(Exchange.count).to eq(prev_count + 1)
      end

      it "returns the json of the newly created exchange" do
        store = Store.first
        user = User.first
        post_json = {
          exchange: {
            points_given: 10,
            points_redeemed: 0,
            store_id: store.id,
            user_id: user.id
          }
        }
        post(:create, params: post_json)
        return_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(return_json).to be_kind_of(Hash)
        expect(return_json).to_not be_kind_of(Array)
        expect(return_json["exchange"]["points_given"]).to eq 10
        expect(return_json["exchange"]["points_earned"]).to eq nil
      end

    end

    context "when user or admin is not logged in" do

      it "should not have a successful response" do
        post_json = {
          exchange: {
            points_given: 10,
            points_redeemed: 0,
            store_id: 1,
            user_id: 1
          }
        }
        post(:create, params: post_json)
        expect(response.status).to_not eq 200
      end

      it "should prompt an user to sign in" do
        get :create
        expect(response.body).to have_content('You are being redirected.')
      end
    end
  end

end
