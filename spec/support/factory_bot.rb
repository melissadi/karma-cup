require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
    first_name { 'Tracy' }
    last_name { 'Allen' }
    id { 1 }
  end

  factory :store do
    name { 'Flour Bakery' }
    description { 'Bakery and coffee shop serving seasonal sandwiches' }
    location { '85 Seaport Blvd' }
    id { 1 }
  end

  factory :admin do
    sequence(:email) {|n| "admin#{n}@example.com" }
    store_id { 1 }
    password { 'password' }
    password_confirmation { 'password' }
    id { 1 }
  end

  factory :exchange do
    user_id { 1 }
    points_given { 10 }
    points_redeemed { 0 }
    store_id { 1 }
  end

  factory :reward do
    name { "Store Reward" }
    point_value { 10 }
    description { "A reward to a store" }
    store_id { 1 }
  end

  factory :random_reward, class: Reward do
    name { "Random Reward" }
    description { "Redeem points for a random reward" }
    store_id { 2 }
    point_value { 20 }
  end

  factory :random_admin, class: Admin do
    sequence(:email) {|n| "admin#{n}@example.com" }
    store_id { 2 }
    password { 'password' }
    password_confirmation { 'password' }
    id { 2 }
  end

  factory :random_user, class: User do
    first_name { Faker::Lorem.word }
    last_name { Faker::Lorem.word }
    sequence(:email) {|n| "#{Faker::Lorem.word}#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
  end
end
