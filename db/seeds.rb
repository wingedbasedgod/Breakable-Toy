# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Pattern.delete_all


eightth = (1.0 / 2.0 )
sixteenth = (1.0 / 4.0 )

triplet = (1.0 / 3.0)
sixlet = (1.0 / 6.0)

patterns = []

patterns << Pattern.create(
  name: 'Accent Tap',
  subdivision: eightth,
  time_repeated: 1,
  right_hand: [
    [3,1,1,1,3,1,1,1],[0,0,0,0,0,0,0,0],
	  [3,1,1,3,1,1,3,1],[0,0,0,0,0,0,0,0]
  ],
  left_hand: [
    [0,0,0,0,0,0,0,0],[3,1,1,1,3,1,1,1],
	  [0,0,0,0,0,0,0,0],[3,1,1,3,1,1,3,1]
  ]
)

patterns << Pattern.create(
  name: 'Duple Roll',
  subdivision: 0.5,
  time_repeated: 1,
  right_hand: [
    [1,0,1,0],[4,0,4,0],[1,0,1,0],[4,0,4,0],
	  [1,0,1,0],[1,0,1,0],[4,0,4,0],[4,0,4,0]
  ],
  left_hand: [
    [0,1,0,1],[0,4,0,4],[0,1,0,1],[0,4,0,4],
	  [0,1,0,1],[0,1,0,1],[0,4,0,4],[0,4,0,4]
  ]
)

patterns << Pattern.create(
  name: 'Double Beat',
  subdivision: eightth,
  time_repeated: 0,
  right_hand: [
    [1,1,0,1,1,0,1,1,0,1,1,0,1,0,1,0],
	  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ],
  left_hand: [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	  [1,1,0,1,1,0,1,1,0,1,1,0,1,0,1,0]
  ]
)

patterns << Pattern.create(
  name: 'Straight 8s',
  subdivision: eightth,
  time_repeated: 1,
  right_hand: [
    [1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],
  	[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],
  	[1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0],
  	[1,1,1,1,0,0,0,0],[1,1,0,0,1,1,0,0]
  ],
  left_hand: [
    [0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],
	  [1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],
	  [0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1],
	  [1,1,1,1,0,0,0,0],[0,0,1,1,0,0,1,1]
  ]
)

patterns << Pattern.create(
  name: 'Herta',
  subdivision: sixlet,
  time_repeated: 6,
  right_hand: [
    [1,0,1,0,0,0],[1,0,1,0,0,0]
  ],
  left_hand: [
    [0,1,0,0,1,0],[0,1,0,0,1,0]
  ]
)
