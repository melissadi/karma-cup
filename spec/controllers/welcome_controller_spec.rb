require 'rails_helper'
require_relative '../support/controller_macros'

RSpec.configure do |config|
  config.include Devise::Test::ControllerHelpers, :type => :controller

  config.extend ControllerMacros, :type => :controller
end

RSpec.describe WelcomeController, type: :controller do

  describe "GET#index" do

    context "when visitor is logged out" do
      it "should not have a current_user" do
        expect(subject.current_user).to eq(nil)
      end
      it "should get index" do
        get 'index'
        response.should be_successful
      end
    end

    context "when user or admin is logged in" do
      login_user
      it "should have a current_user or current_admin" do
        expect(subject.current_user).to_not eq(nil)
      end
      it "should get index" do
        get 'index'
        response.should be_successful
      end
    end

  end
end
