# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Store.create!([
  {name: "Tatte", description: "Coffee shop with baked goods and seasonal entrees", location: "125 Summer Street"},
  {name: "Dunkin Donuts", description: "Boston-based coffee chain serving flavored coffees and donuts", location: "55 Summer Street"},
  {name: "Kung Fu Tea", description: "Taiwan-style bubble tea and desserts", location: "10 Beach Street"}
  ])

Admin.create!([
  {email: "tatte_admin@test.com", store: Store.first, password: "password", id: 1},
  {email: "dunkin_admin@test.com", store: Store.second, password: "password", id: 2},
  {email: "kungfu_admin@test.com", store: Store.third, password: "password", id: 3}
  ])

User.create!([
  {email: "melissa@test.com", password: "password", first_name: "Melissa", last_name: "Straus"},
  {email: "charlie@test.com", password: "password", first_name: "Charlie", last_name: "Charles"},
  {email: "rocco@test.com", password: "password", first_name: "Rocco", last_name: "Little"},
  {email: "sadie@test.com", password: "password", first_name: "Sadie", last_name: "Smith"},
  {email: "wally@test.com", password: "password", first_name: "Wally", last_name: "Golf"},
  {email: "ben@test.com", password: "password", first_name: "Benny", last_name: "Rei"}
  ])

Reward.create!([
  {name: "Free Coffee", description: "Redeem 100 points for a Stumptown coffee of any size", point_value: 100, store_id: 1},
  {name: "$10 Off", description: "Redeem 1000 points for $10 off your next order", point_value: 1000, store_id: 1},
  {name: "Free Pastry", description: "Redeem 400 points for a pastry of the day", point_value: 400, store_id: 1},
  {name: "$5 Off", description: "Redeem 500 points for $5 off your next order", point_value: 500, store_id: 1},
  ])
