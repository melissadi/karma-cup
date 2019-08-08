# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Store.create!([
  {name: "Tatte", description: "Coffee shop with baked goods and seasonal entrees", location: "125 Summer Street", id: 1},
  {name: "Dunkin Donuts", description: "Boston-based coffee chain serving flavored coffees and donuts", location: "55 Summer Street", id: 2},
  {name: "Kung Fu Tea", description: "Taiwan-style bubble tea and desserts", location: "10 Beach Street", id: 3}
  ])

Admin.create!([
  {email: "tatte_admin@test.com", store: Store.first, password: "password", id: 1},
  {email: "dunkin_admin@test.com", store: Store.second, password: "password", id: 2},
  {email: "kungfu_admin@test.com", store: Store.third, password: "password", id: 3}
  ])

User.create!([
  {email: "melissa@test.com", password: "password", first_name: "Melissa", last_name: "Straus", points: 520, id: 1},
  {email: "charlie@test.com", password: "password", first_name: "Charlie", last_name: "Charles", points: 600, id: 2},
  {email: "rocco@test.com", password: "password", first_name: "Rocco", last_name: "Little", points: 300, id: 3},
  {email: "sadie@test.com", password: "password", first_name: "Sadie", last_name: "Smith", points: 50, id: 4},
  {email: "wally@test.com", password: "password", first_name: "Wally", last_name: "Golf", points: 20, id: 5},
  {email: "ben@test.com", password: "password", first_name: "Benny", last_name: "Rei", points: 250, id: 6}
  ])

Reward.create!([
  {name: "Free Coffee", description: "Get a free hot Stumptown coffee of any size", point_value: 100, store_id: 1, id: 1},
  {name: "$10 Off", description: "Get $10 off your next in-store order", point_value: 1000, store_id: 1, id: 2},
  {name: "Free Pastry", description: "Get a freshly baked pastry with your next in-store purchase", point_value: 400, store_id: 1, id: 3},
  {name: "$5 Off", description: "Get $5 off your next in-person order", point_value: 500, store_id: 1, id: 4},
  {name: "Small Bubble Tea", description: "Get a small bubble tea of any flavor", point_value: 100, store_id: 3, id: 5},
  {name: "One Dozen Donuts", description: "Get twelves donuts of your choice", point_value: 500, store_id: 2, id: 6},
  ])

Exchange.create!([
  {points_given: 10, user_id: 1, store_id: 1, created_at: "2019-08-08 16:48:43" },
  {points_given: 10, user_id: 1, store_id: 1, created_at: "2019-08-09 16:48:43"},
  {points_given: 10, user_id: 1, store_id: 1, created_at: "2019-08-10 16:48:43"},
  {points_given: 10, user_id: 1, store_id: 1, created_at: "2019-09-01 16:48:43"},
  {points_given: 10, user_id: 1, store_id: 1, created_at: "2019-09-02 16:48:43"},
  {points_given: 10, user_id: 1, store_id: 1, created_at: "2019-09-03 16:48:43"},
  {points_given: 10, user_id: 1, store_id: 1, created_at: "2019-09-08 16:48:43"},
  {points_given: 10, user_id: 1, store_id: 1, created_at: "2019-09-15 16:48:43"},
  {points_given: 10, user_id: 1, store_id: 1, created_at: "2019-09-20 16:48:43"},
  {points_given: 10, user_id: 1, store_id: 1, created_at: "2019-09-21 16:48:43"},
  {points_given: 10, user_id: 2, store_id: 3, created_at: "2019-08-08 16:48:43"},
  {points_given: 10, user_id: 2, store_id: 2, created_at: "2019-08-11 16:48:43"},
  {points_given: 10, user_id: 3, store_id: 3, created_at: "2019-08-07 16:48:43"},
  {points_given: 10, user_id: 4, store_id: 1, created_at: "2019-08-05 16:48:43"},
  {points_given: 10, user_id: 5, store_id: 1, created_at: "2019-08-08 16:48:43"},
  {points_given: 10, user_id: 1, store_id: 2, created_at: "2019-09-09 16:48:43"},
  {points_given: 10, user_id: 6, store_id: 2, created_at: "2019-08-07 16:48:43"},
  {points_given: 10, user_id: 6, store_id: 3, created_at: "2019-08-08 16:48:43"},
  {points_redeemed: 100, user_id: 1, store_id: 1, reward_id: 1, created_at: "2019-10-02 16:48:43"},
  {points_redeemed: 500, user_id: 2, store_id: 2, reward_id: 6, created_at: "2019-09-22 16:48:43"},
  {points_redeemed: 100, user_id: 3, store_id: 1, reward_id: 1, created_at: "2019-09-30 16:48:43"},
  {points_redeemed: 500, user_id: 4, store_id: 2, reward_id: 6, created_at: "2019-10-01 16:48:43"}
  ])
