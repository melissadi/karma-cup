# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Store.create!([
  {name: "Tatte", description: "Coffee shop with baked goods and seasonal entrees", location: "125 Summer Street"},
  {name: "Dunkin Donuts", description: "Boston institution serving flavored coffees and donuts", location: "55 Summer Street"},
  {name: "Kung Fu Tea", description: "Taiwan-style bubble tea and desserts", location: "10 Beach Street"}
  ])

Admin.create!([
  {email: "tatte_admin@test.com", store: Store.first, password: "password"},
  {email: "dunkin_admin@test.com", store: Store.second, password: "password"},
  {email: "kungfu_admin@test.com", store: Store.third, password: "password"}
  ])
