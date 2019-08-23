require 'rails_helper'
require_relative '../support/controller_macros'

RSpec.configure do |config|
  config.include Devise::Test::ControllerHelpers, :type => :controller
  config.extend ControllerMacros, :type => :controller
end

RSpec.describe Api::V1::AdminsController, type: :controller do
  describe "GET#show" do

    context "when admin is logged in" do
      login_admin

      it "should return the relevant Admin object" do
        get :show, params: {id: 1}
        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type). to eq("application/json")
        expect(returned_json.length).to eq 1
        expect(returned_json["admin"]["email"]).to eq "admin1@example.com"
        expect(returned_json["admin"]["store"]["name"]).to eq "Flour Bakery"
      end
    end

    context "when admin is not logged in" do

      it "should not have a successful response" do
        get :show, params: {id: 1}
        expect(response.status).to_not eq 200
      end

      it "should prompt an admin to sign in" do
        get :show, params: {id: 1}
        expect(response.body).to have_content('You are being redirected.')
      end
    end
  end
end
