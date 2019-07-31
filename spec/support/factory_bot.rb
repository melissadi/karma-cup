require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
    first_name { 'Tracy' }
    last_name { 'Allen' }
  end
  
  factory :store do
    name { 'Flour Bakery' }
    description { 'Bakery and coffee shop serving seasonal sandwiches' }
    location { '85 Seaport Blvd' }
    id { 1 }
  end

  factory :admin do
    sequence(:email) {|n| "user#{n}@example.com" }
    store_id { 1 }
    password { 'password' }
    password_confirmation { 'password' }
  end


  factory :random_user, class: User do
    first_name { Faker::Lorem.word }
    last_name { Faker::Lorem.word }
    sequence(:email) {|n| "#{Faker::Lorem.word}#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
  end
end
