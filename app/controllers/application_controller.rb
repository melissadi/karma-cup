class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  protect_from_forgery unless: -> { request.format.json? }

  before_action :configure_permitted_parameters, if: :devise_controller?

  def after_sign_in_path_for(admin)
    if admin.class == Admin
      "/admins/#{admin.id}"
    elsif admin.class == User
      "/users/#{admin.id}"
    end
  end

   protected

      def configure_permitted_parameters
           devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:email, :first_name, :last_name, :password)}

           devise_parameter_sanitizer.permit(:sign_in) { |u| u.permit(:email, :password)}

           devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:first_name, :last_name, :email, :password, :current_password)}
      end

end
