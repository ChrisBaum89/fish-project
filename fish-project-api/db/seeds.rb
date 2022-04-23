# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

clownfish = Category.create(
  name: "Clown Fish",
  description: "Clownfish are easily the most recognized fish anywhere. They are brightly colored, easy to care for, and friendly by nature.  They are quite possibly the most popular fish with their comical Clownfish dance, wiggling to and fro.  Huge advances in science have allowed for aquacultured Clownfish with many variations and mutations.  These fish will easily adapt to most environments and will eat any kind of meaty seafood, flake or pellet.")
lionfish = Category.create(
  name: "Lion Fish",
  description: "Stunning, amazing, gorgeous...and venomous, Lionfish are heralded for their beauty and grace. With long flowing dorsal fins, lionfish are unique in every way.  These predatory fish will stalk their prey, then using their mesmerizing fins to distract their meal,  they will take a single gulp and eat anything over half their own size!  The signature dorsal fins are well known to hold venom that protects the Lionfish from its own predators.  The Lionfish should be offered small meals of meaty seafood.")
puffers = Category.create(
  name: "Puffers",
  description: "Puffers are a remarkably unique fish.   True to their name, Puffers have the ability to puff themselves up to be nearly twice their resting size, sometimes as a stress response or as a fully functional defense tactic.  Potential predators do not attempt to swallow a puffed Puffer as it would prove fatal.  Puffers have large teeth, so they spend most of their time grazing the reef eating coral polyps and invertebrates.  For this reason, they aren't reef safe.  Puffers will eat a varied diet of meaty seafoods, pellets and flake foods.")
tangs = Category.create(
  name: "Tangs",
  description: "Tangs are notably one of the most desired species of fish due to their bold presence, active demeanor, and their need to always be front and center.  There are many varieties of Tangs and they can be kept together with respect to the size of their environment.  They are a peaceful community fish and will thrive in most conditions including a coral reef system or a live rock only system.  Tangs are omnivores and constantly pick at algae and just about any other prepared foods such as meaty seafoods, flakes and pellets.")



falsepercula = Fish.create(
  name: 'False Percula Ocellaris Clownfish',
  description: "The False Percula Clownfish, Amphiprion ocellaris, has an orange body with three white bands outlined in black as well as black edging on the fins and tail. The false moniker comes from the fact that the orange coloration is slightly muted from the true percula clownfish, though the band pattern is almost identical. They are social and very peaceful with other species as well as other peaceful clownfish and can even be kept in a school if the tank is large enough. They are also very hardy, and a great choice for a beginner.",
  size: '3 inches',
  img_url: "https://commondatastorage.googleapis.com/swf_produ…_life/576_false-percula-ocellaris-clownfish_1.jpg",
  category_id: 1)
goldstripemaroon = Fish.create(
  name: "Gold Stripe Maroon Clownfish",
  description: "The Gold Stripe Maroon Clownfish, Premnas biaculeatus, has a deep maroon color with three gold bands, one just behind the face, one bisecting the body and one just before the tail. Like all gold stripe maroons, the stripes will appear white and turn to gold as they mature. They are social so they can be kept in a school if the tank is large enough, but are known to be a little more aggressive than most clownfish and will become aggressive towards other genus of clownfish.",
  size: "6 inches",
  img_url: "https://commondatastorage.googleapis.com/swf_product_images/marine_life/1235_wildgsmaroon.jpg",
  category_id: 1)
blackandwhite = Fish.create(
  name: "Black and White Ocellaris Clownfish",
  description: "The Black and White Ocellaris, Amphiprion ocellaris, has a unique look with an all black body and three white bands displaying a slight orange color on the face that will darker as it matures. They are social and very peaceful with other species as well as other peaceful clownfish and can even be kept in a school if the tank is large enough. They are also very hardy, and a great choice for a beginner.
",
size: "3 inches",
img_url: "https://commondatastorage.googleapis.com/swf_produ…7113_black-and-white-ocellaris-captive-bred_1.jpg",
category_id: 1)
radiata = Fish.create(
  name: 'Radiata Lionfish',
  description: "The fish Pterois Radiata can be referred with different names like Radiata Lionfish, Radial Firefish, Scorpion Radiata, Clearfin Lionfish, Clearfin Turkeyfish, Tailbar Lionfish, White-lined Lionfish, Whitefin Lionfish, and Dragonfish. It features red, white and black vertical stripes over the body with large fan structure like pectoral fins and quill-like dorsal fans. It is not reef safe as it is fond of eating shrimps and crabs. It should be kept with same size or large size fish as small size fish can end up as food. The Lionfish is distinguished from Radiata Lionfish as it has blank spines. It is the sole member of the Pterois genus who doesn;t have any markings in the vertical fin rays. This can be easily recognized with white strapis decorated tail. The poison these fish can inflict is shot out through their venomous spines from the glands in the long grooves of their fins. If you are allergic, you may get affected with a serious reaction. Be ready with medical attention to handle this situation. ",
  size: "10 inches",
  img_url: "https://commondatastorage.googleapis.com/swf_produ…s/marine_life/435_radiata-lionfish-venomous_1.jpg",
  category_id: 2)
volitan = Fish.create(
  name: "Volitan Lionfish",
  description: "The Volitan Lionfish, Pterois volitans, also known as just the Lionfish, Red Firefish, Turkeyfish, and Butterfly Cod, is a beautifully colored solitary species. It features vertical stripes along its red/burgundy/white body with large pectoral fins. Being one of the larger bodied Lionfish, it will surely become a centerpiece to your reef aquarium.",
  size: "15 inches",
  img_url: "https://commondatastorage.googleapis.com/swf_product_images/marine_life/655_volitan-lionfish_1.jpg",
  category_id: 2)
dogface = Fish.create(
  name: "Grey Dogface Puffer",
  description: "The Dogface Puffer, Arothron nigropunctatus, also known as the Dog Face Puffer, is a peaceful marine species that features large expressive eyes and a sad-looking small mouth. As a voracious carnivore, the Dog Face Puffer will unabashedly devour small inverts but won't damage corals. Their hard teeth can easily bite through mollusk and clam shells.  It is best kept in a tank  plenty of live rock hiding places. Feeding the Dogface Puffer can be difficult, especially if they feel stressed or insecure. They will take a carnivorous diet of shrimp, squid, clams, and crabs or other meaty marine foods, frozen or live. Only one puffer should be kept per tank. ",
  size: "10 inches",
  img_url: "https://commondatastorage.googleapis.com/swf_produ…_images/599_dogface-puffer_1_ac87be33da_thumb.jpg",
  category_id: 3)
bluehippo = Fish.create(
  name: "Blue Hippo Tang",
  description: "The Blue Hippo Tang, a.k.a. Regal Tang, is a beautiful blue fish with black bands and a yellow tailfin. These fish have interesting behavior and do well in groups. The Blue Hippo likes lots of rockwork to help make it feel secure. They can be kept singly or in groups. The Blue Hippo can be very timid and may wedge themselves under rocks and into caves and crevices when young or new to an aquarium. In the wild they will wedge themselves into coralheads and branching corals. They are very peaceful towards other fish and do well in a peaceful community or reef tank. This fish will often lie on its side and play dead.The Surgeonfish family consists of fish which are colorful, thin-bodied, and usually have an oval shape. These fish have long continuous dorsal and anal fins and crescent tailfins. The scalpel at the base of their tailfin is very sharp and is used by the fish for protection from predators as well as a way of establishing itself with other fish.",
  size: "12 inches",
  img_url: "https://commondatastorage.googleapis.com/swf_produ…mages/4610_blue-hippo-tang_1_f315527e0e_thumb.jpg",
  category_id: 4)
