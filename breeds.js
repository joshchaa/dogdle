// DOGDLE Breed Dataset
// Fields: id, name, size, sizeOrder, shed, shedOrder, groom, groomOrder,
//         coat, active, activeOrder, lifespanLow, lifespanHigh,
//         origin, originRegion, dogCeoPath, petfinderName

export const BREEDS = [
  {
    id: "labrador-retriever",
    name: "Labrador Retriever",
    size: "L", sizeOrder: 4,
    shed: "High", shedOrder: 3,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 10, lifespanHigh: 12,
    origin: "Canada", originRegion: "North America",
    dogCeoPath: "labrador",
    petfinderName: "Labrador Retriever"
  },
  {
    id: "golden-retriever",
    name: "Golden Retriever",
    size: "L", sizeOrder: 4,
    shed: "High", shedOrder: 3,
    groom: "Moderate", groomOrder: 2,
    coat: "Medium",
    active: "High", activeOrder: 3,
    lifespanLow: 10, lifespanHigh: 12,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "retriever/golden",
    petfinderName: "Golden Retriever"
  },
  {
    id: "german-shepherd",
    name: "German Shepherd",
    size: "L", sizeOrder: 4,
    shed: "High", shedOrder: 3,
    groom: "Moderate", groomOrder: 2,
    coat: "Medium",
    active: "High", activeOrder: 3,
    lifespanLow: 9, lifespanHigh: 13,
    origin: "Germany", originRegion: "Europe",
    dogCeoPath: "german/shepherd",
    petfinderName: "German Shepherd Dog"
  },
  {
    id: "french-bulldog",
    name: "French Bulldog",
    size: "S", sizeOrder: 2,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "Low", activeOrder: 1,
    lifespanLow: 10, lifespanHigh: 12,
    origin: "France", originRegion: "Europe",
    dogCeoPath: "bulldog/french",
    petfinderName: "French Bulldog"
  },
  {
    id: "bulldog",
    name: "Bulldog",
    size: "M", sizeOrder: 3,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "Low", activeOrder: 1,
    lifespanLow: 8, lifespanHigh: 10,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "bulldog/english",
    petfinderName: "Bulldog"
  },
  {
    id: "poodle",
    name: "Poodle",
    size: "L", sizeOrder: 4,
    shed: "Low", shedOrder: 1,
    groom: "High", groomOrder: 3,
    coat: "Curly",
    active: "High", activeOrder: 3,
    lifespanLow: 10, lifespanHigh: 18,
    origin: "Germany", originRegion: "Europe",
    dogCeoPath: "poodle/standard",
    petfinderName: "Poodle"
  },
  {
    // Beagle: 20–30 lbs — falls in S range (12–25 lbs border); standard classification is S
    id: "beagle",
    name: "Beagle",
    size: "S", sizeOrder: 2,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 10, lifespanHigh: 15,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "beagle",
    petfinderName: "Beagle"
  },
  {
    id: "rottweiler",
    name: "Rottweiler",
    size: "L", sizeOrder: 4,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 8, lifespanHigh: 10,
    origin: "Germany", originRegion: "Europe",
    dogCeoPath: "rottweiler",
    petfinderName: "Rottweiler"
  },
  {
    id: "dachshund",
    name: "Dachshund",
    size: "S", sizeOrder: 2,
    shed: "Low", shedOrder: 1,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 12, lifespanHigh: 16,
    origin: "Germany", originRegion: "Europe",
    dogCeoPath: "dachshund",
    petfinderName: "Dachshund"
  },
  {
    id: "pembroke-welsh-corgi",
    name: "Pembroke Welsh Corgi",
    size: "S", sizeOrder: 2,
    shed: "High", shedOrder: 3,
    groom: "Moderate", groomOrder: 2,
    coat: "Medium",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 13,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "pembroke",
    petfinderName: "Welsh Corgi, Pembroke"
  },
  {
    id: "australian-shepherd",
    name: "Australian Shepherd",
    size: "M", sizeOrder: 3,
    shed: "Moderate", shedOrder: 2,
    groom: "Moderate", groomOrder: 2,
    coat: "Medium",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 15,
    origin: "USA", originRegion: "North America",
    dogCeoPath: "australian/shepherd",
    petfinderName: "Australian Shepherd"
  },
  {
    id: "yorkshire-terrier",
    name: "Yorkshire Terrier",
    size: "XS", sizeOrder: 1,
    shed: "Low", shedOrder: 1,
    groom: "High", groomOrder: 3,
    coat: "Long",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 11, lifespanHigh: 15,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "terrier/yorkshire",
    petfinderName: "Yorkshire Terrier"
  },
  {
    id: "boxer",
    name: "Boxer",
    size: "L", sizeOrder: 4,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 10, lifespanHigh: 12,
    origin: "Germany", originRegion: "Europe",
    dogCeoPath: "boxer",
    petfinderName: "Boxer"
  },
  {
    // Siberian Husky: originates from Chukotka, Siberia — geographically Asia
    id: "siberian-husky",
    name: "Siberian Husky",
    size: "L", sizeOrder: 4,
    shed: "High", shedOrder: 3,
    groom: "Moderate", groomOrder: 2,
    coat: "Medium",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 14,
    origin: "Russia", originRegion: "Asia",
    dogCeoPath: "husky",
    petfinderName: "Siberian Husky"
  },
  {
    id: "cavalier-king-charles-spaniel",
    name: "Cavalier King Charles Spaniel",
    size: "S", sizeOrder: 2,
    shed: "Moderate", shedOrder: 2,
    groom: "Moderate", groomOrder: 2,
    coat: "Medium",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 9, lifespanHigh: 15,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: null,
    petfinderName: "Cavalier King Charles Spaniel"
  },
  {
    id: "doberman-pinscher",
    name: "Doberman Pinscher",
    size: "L", sizeOrder: 4,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 10, lifespanHigh: 12,
    origin: "Germany", originRegion: "Europe",
    dogCeoPath: "doberman",
    petfinderName: "Doberman Pinscher"
  },
  {
    id: "great-dane",
    name: "Great Dane",
    size: "XL", sizeOrder: 5,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 7, lifespanHigh: 10,
    origin: "Germany", originRegion: "Europe",
    dogCeoPath: "dane/great",
    petfinderName: "Great Dane"
  },
  {
    id: "miniature-schnauzer",
    name: "Miniature Schnauzer",
    size: "S", sizeOrder: 2,
    shed: "Low", shedOrder: 1,
    groom: "High", groomOrder: 3,
    coat: "Wire",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 12, lifespanHigh: 15,
    origin: "Germany", originRegion: "Europe",
    dogCeoPath: "schnauzer/miniature",
    petfinderName: "Schnauzer, Miniature"
  },
  {
    id: "shih-tzu",
    name: "Shih Tzu",
    size: "S", sizeOrder: 2,
    shed: "Low", shedOrder: 1,
    groom: "High", groomOrder: 3,
    coat: "Long",
    active: "Low", activeOrder: 1,
    lifespanLow: 10, lifespanHigh: 18,
    origin: "China", originRegion: "Asia",
    dogCeoPath: "shihtzu",
    petfinderName: "Shih Tzu"
  },
  {
    id: "boston-terrier",
    name: "Boston Terrier",
    size: "S", sizeOrder: 2,
    shed: "Low", shedOrder: 1,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 11, lifespanHigh: 13,
    origin: "USA", originRegion: "North America",
    dogCeoPath: "terrier/boston",
    petfinderName: "Boston Terrier"
  },
  {
    // Bernese Mountain Dog: AKC lifespan 7–10 years (corrected from 6–8)
    id: "bernese-mountain-dog",
    name: "Bernese Mountain Dog",
    size: "XL", sizeOrder: 5,
    shed: "High", shedOrder: 3,
    groom: "Moderate", groomOrder: 2,
    coat: "Long",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 7, lifespanHigh: 10,
    origin: "Switzerland", originRegion: "Europe",
    dogCeoPath: "mountain/bernese",
    petfinderName: "Bernese Mountain Dog"
  },
  {
    id: "pomeranian",
    name: "Pomeranian",
    size: "XS", sizeOrder: 1,
    shed: "Moderate", shedOrder: 2,
    groom: "High", groomOrder: 3,
    coat: "Long",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 12, lifespanHigh: 16,
    origin: "Germany", originRegion: "Europe",
    dogCeoPath: "pomeranian",
    petfinderName: "Pomeranian"
  },
  {
    id: "border-collie",
    name: "Border Collie",
    size: "M", sizeOrder: 3,
    shed: "Moderate", shedOrder: 2,
    groom: "Moderate", groomOrder: 2,
    coat: "Medium",
    active: "High", activeOrder: 3,
    lifespanLow: 10, lifespanHigh: 17,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "collie/border",
    petfinderName: "Border Collie"
  },
  {
    id: "shetland-sheepdog",
    name: "Shetland Sheepdog",
    size: "S", sizeOrder: 2,
    shed: "High", shedOrder: 3,
    groom: "Moderate", groomOrder: 2,
    coat: "Long",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 14,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "sheepdog/shetland",
    petfinderName: "Shetland Sheepdog (Sheltie)"
  },
  {
    id: "maltese",
    name: "Maltese",
    size: "XS", sizeOrder: 1,
    shed: "Low", shedOrder: 1,
    groom: "High", groomOrder: 3,
    coat: "Long",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 12, lifespanHigh: 15,
    origin: "Malta", originRegion: "Europe",
    dogCeoPath: "maltese",
    petfinderName: "Maltese"
  },
  {
    id: "chihuahua",
    name: "Chihuahua",
    size: "XS", sizeOrder: 1,
    shed: "Low", shedOrder: 1,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 14, lifespanHigh: 16,
    origin: "Mexico", originRegion: "North America",
    dogCeoPath: "chihuahua",
    petfinderName: "Chihuahua"
  },
  {
    id: "basset-hound",
    name: "Basset Hound",
    size: "M", sizeOrder: 3,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "Low", activeOrder: 1,
    lifespanLow: 10, lifespanHigh: 12,
    origin: "France", originRegion: "Europe",
    dogCeoPath: "hound/basset",
    petfinderName: "Basset Hound"
  },
  {
    id: "mastiff",
    name: "Mastiff",
    size: "XL", sizeOrder: 5,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "Low", activeOrder: 1,
    lifespanLow: 6, lifespanHigh: 10,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "mastiff/english",
    petfinderName: "Mastiff"
  },
  {
    id: "cocker-spaniel",
    name: "Cocker Spaniel",
    size: "M", sizeOrder: 3,
    shed: "Moderate", shedOrder: 2,
    groom: "High", groomOrder: 3,
    coat: "Medium",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 10, lifespanHigh: 14,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "spaniel/cocker",
    petfinderName: "Cocker Spaniel"
  },
  {
    id: "weimaraner",
    name: "Weimaraner",
    size: "L", sizeOrder: 4,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 10, lifespanHigh: 13,
    origin: "Germany", originRegion: "Europe",
    dogCeoPath: "weimaraner",
    petfinderName: "Weimaraner"
  },
  {
    id: "bichon-frise",
    name: "Bichon Frise",
    size: "XS", sizeOrder: 1,
    shed: "Low", shedOrder: 1,
    groom: "High", groomOrder: 3,
    coat: "Curly",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 14, lifespanHigh: 15,
    origin: "Belgium", originRegion: "Europe",
    dogCeoPath: "frise/bichon",
    petfinderName: "Bichon Frise"
  },
  {
    id: "brittany-spaniel",
    name: "Brittany Spaniel",
    size: "M", sizeOrder: 3,
    shed: "Moderate", shedOrder: 2,
    groom: "Moderate", groomOrder: 2,
    coat: "Medium",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 14,
    origin: "France", originRegion: "Europe",
    dogCeoPath: "spaniel/brittany",
    petfinderName: "Brittany Spaniel"
  },
  {
    // Bull Terrier: AKC lifespan 12–13 years (corrected from 10–14)
    id: "bull-terrier",
    name: "Bull Terrier",
    size: "M", sizeOrder: 3,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 13,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "bullterrier",
    petfinderName: "Bull Terrier"
  },
  {
    id: "dalmatian",
    name: "Dalmatian",
    size: "L", sizeOrder: 4,
    shed: "High", shedOrder: 3,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 11, lifespanHigh: 13,
    origin: "Croatia", originRegion: "Europe",
    dogCeoPath: "dalmatian",
    petfinderName: "Dalmatian"
  },
  {
    id: "irish-setter",
    name: "Irish Setter",
    size: "L", sizeOrder: 4,
    shed: "Moderate", shedOrder: 2,
    groom: "Moderate", groomOrder: 2,
    coat: "Long",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 15,
    origin: "Ireland", originRegion: "Europe",
    dogCeoPath: "setter/irish",
    petfinderName: "Setter, Irish"
  },
  {
    // Samoyed: originates from Siberia — geographically Asia
    id: "samoyed",
    name: "Samoyed",
    size: "L", sizeOrder: 4,
    shed: "High", shedOrder: 3,
    groom: "High", groomOrder: 3,
    coat: "Long",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 14,
    origin: "Russia", originRegion: "Asia",
    dogCeoPath: "samoyed",
    petfinderName: "Samoyed"
  },
  {
    // Akita: males 100–130 lbs, females 70–100 lbs — L is more accurate by average weight
    id: "akita",
    name: "Akita",
    size: "L", sizeOrder: 4,
    shed: "High", shedOrder: 3,
    groom: "Moderate", groomOrder: 2,
    coat: "Medium",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 10, lifespanHigh: 13,
    origin: "Japan", originRegion: "Asia",
    dogCeoPath: "akita",
    petfinderName: "Akita"
  },
  {
    id: "basenji",
    name: "Basenji",
    size: "S", sizeOrder: 2,
    shed: "Low", shedOrder: 1,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 13, lifespanHigh: 14,
    origin: "Congo", originRegion: "Africa",
    dogCeoPath: "basenji",
    petfinderName: "Basenji"
  },
  {
    id: "bloodhound",
    name: "Bloodhound",
    size: "L", sizeOrder: 4,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 10, lifespanHigh: 12,
    origin: "Belgium", originRegion: "Europe",
    dogCeoPath: "hound/blood",
    petfinderName: "Bloodhound"
  },
  {
    id: "chow-chow",
    name: "Chow Chow",
    size: "M", sizeOrder: 3,
    shed: "High", shedOrder: 3,
    groom: "High", groomOrder: 3,
    coat: "Long",
    active: "Low", activeOrder: 1,
    lifespanLow: 8, lifespanHigh: 12,
    origin: "China", originRegion: "Asia",
    dogCeoPath: "chow",
    petfinderName: "Chow Chow"
  },
  {
    // Greyhound: low-energy at home despite sprinting ability; AKC active level is Low–Moderate
    id: "greyhound",
    name: "Greyhound",
    size: "L", sizeOrder: 4,
    shed: "Low", shedOrder: 1,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "Low", activeOrder: 1,
    lifespanLow: 10, lifespanHigh: 13,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: null,
    petfinderName: "Greyhound"
  },
  {
    id: "havanese",
    name: "Havanese",
    size: "XS", sizeOrder: 1,
    shed: "Low", shedOrder: 1,
    groom: "High", groomOrder: 3,
    coat: "Long",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 14, lifespanHigh: 16,
    origin: "Cuba", originRegion: "North America",
    dogCeoPath: "havanese",
    petfinderName: "Havanese"
  },
  {
    id: "italian-greyhound",
    name: "Italian Greyhound",
    size: "S", sizeOrder: 2,
    shed: "Low", shedOrder: 1,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 14, lifespanHigh: 15,
    origin: "Italy", originRegion: "Europe",
    dogCeoPath: "greyhound/italian",
    petfinderName: "Italian Greyhound"
  },
  {
    id: "jack-russell-terrier",
    name: "Jack Russell Terrier",
    size: "S", sizeOrder: 2,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 13, lifespanHigh: 16,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "terrier/russell",
    petfinderName: "Jack Russell Terrier"
  },
  {
    id: "papillon",
    name: "Papillon",
    size: "XS", sizeOrder: 1,
    shed: "Moderate", shedOrder: 2,
    groom: "Moderate", groomOrder: 2,
    coat: "Long",
    active: "High", activeOrder: 3,
    lifespanLow: 13, lifespanHigh: 15,
    origin: "France", originRegion: "Europe",
    dogCeoPath: "papillon",
    petfinderName: "Papillon"
  },
  {
    id: "pug",
    name: "Pug",
    size: "S", sizeOrder: 2,
    shed: "High", shedOrder: 3,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "Low", activeOrder: 1,
    lifespanLow: 13, lifespanHigh: 15,
    origin: "China", originRegion: "Asia",
    dogCeoPath: "pug",
    petfinderName: "Pug"
  },
  {
    id: "vizsla",
    name: "Vizsla",
    size: "L", sizeOrder: 4,
    shed: "Low", shedOrder: 1,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 15,
    origin: "Hungary", originRegion: "Europe",
    dogCeoPath: "vizsla",
    petfinderName: "Vizsla"
  },
  {
    id: "whippet",
    name: "Whippet",
    size: "M", sizeOrder: 3,
    shed: "Low", shedOrder: 1,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 15,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "whippet",
    petfinderName: "Whippet"
  },
  {
    id: "wire-fox-terrier",
    name: "Wire Fox Terrier",
    size: "S", sizeOrder: 2,
    shed: "Low", shedOrder: 1,
    groom: "High", groomOrder: 3,
    coat: "Wire",
    active: "High", activeOrder: 3,
    lifespanLow: 13, lifespanHigh: 15,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "terrier/fox",
    petfinderName: "Fox Terrier (Wire)"
  },
  {
    id: "german-shorthaired-pointer",
    name: "German Shorthaired Pointer",
    size: "L", sizeOrder: 4,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 10, lifespanHigh: 12,
    origin: "Germany", originRegion: "Europe",
    dogCeoPath: "pointer/german",
    petfinderName: "German Shorthaired Pointer"
  },

  // --- NEW BREEDS ---

  {
    // Airedale Terrier: 40–65 lbs (M), wiry double coat, UK origin, 11–14 yrs
    id: "airedale-terrier",
    name: "Airedale Terrier",
    size: "M", sizeOrder: 3,
    shed: "Low", shedOrder: 1,
    groom: "High", groomOrder: 3,
    coat: "Wire",
    active: "High", activeOrder: 3,
    lifespanLow: 11, lifespanHigh: 14,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "airedale",
    petfinderName: "Airedale Terrier"
  },
  {
    // Afghan Hound: 50–60 lbs (M), long silky coat, Afghanistan, 12–18 yrs
    id: "afghan-hound",
    name: "Afghan Hound",
    size: "L", sizeOrder: 4,
    shed: "Low", shedOrder: 1,
    groom: "High", groomOrder: 3,
    coat: "Long",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 18,
    origin: "Afghanistan", originRegion: "Middle East",
    dogCeoPath: "hound/afghan",
    petfinderName: "Afghan Hound"
  },
  {
    // Alaskan Malamute: 75–85 lbs (L), thick double coat, Alaska/USA, 10–14 yrs
    id: "alaskan-malamute",
    name: "Alaskan Malamute",
    size: "L", sizeOrder: 4,
    shed: "High", shedOrder: 3,
    groom: "Moderate", groomOrder: 2,
    coat: "Medium",
    active: "High", activeOrder: 3,
    lifespanLow: 10, lifespanHigh: 14,
    origin: "USA", originRegion: "North America",
    dogCeoPath: "malamute",
    petfinderName: "Alaskan Malamute"
  },
  {
    // Australian Cattle Dog: 35–50 lbs (M), short coat, Australia, 12–16 yrs
    id: "australian-cattle-dog",
    name: "Australian Cattle Dog",
    size: "M", sizeOrder: 3,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 16,
    origin: "Australia", originRegion: "Oceania",
    dogCeoPath: "cattledog/australian",
    petfinderName: "Australian Cattle Dog / Blue Heeler"
  },
  {
    // Belgian Malinois: 40–80 lbs (M–L); males up to 80 lbs — L by average
    id: "belgian-malinois",
    name: "Belgian Malinois",
    size: "L", sizeOrder: 4,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 14, lifespanHigh: 16,
    origin: "Belgium", originRegion: "Europe",
    dogCeoPath: "malinois",
    petfinderName: "Belgian Malinois"
  },
  {
    // Borzoi: 60–105 lbs (L–XL); generally classified as L; silky long coat, Russia, 9–14 yrs
    id: "borzoi",
    name: "Borzoi",
    size: "L", sizeOrder: 4,
    shed: "Moderate", shedOrder: 2,
    groom: "Moderate", groomOrder: 2,
    coat: "Long",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 9, lifespanHigh: 14,
    origin: "Russia", originRegion: "Europe",
    dogCeoPath: "borzoi",
    petfinderName: "Borzoi"
  },
  {
    // Cairn Terrier: 13–14 lbs (S), wiry coat, Scotland/UK, 13–15 yrs
    id: "cairn-terrier",
    name: "Cairn Terrier",
    size: "S", sizeOrder: 2,
    shed: "Low", shedOrder: 1,
    groom: "Moderate", groomOrder: 2,
    coat: "Wire",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 13, lifespanHigh: 15,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "terrier/cairn",
    petfinderName: "Cairn Terrier"
  },
  {
    // Cardigan Welsh Corgi: 25–38 lbs (M), medium double coat, Wales/UK, 12–15 yrs
    id: "cardigan-welsh-corgi",
    name: "Cardigan Welsh Corgi",
    size: "M", sizeOrder: 3,
    shed: "High", shedOrder: 3,
    groom: "Moderate", groomOrder: 2,
    coat: "Medium",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 15,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "corgi/cardigan",
    petfinderName: "Welsh Corgi, Cardigan"
  },
  {
    // Chesapeake Bay Retriever: 55–80 lbs (L), wavy/short water-resistant coat, USA, 10–13 yrs
    id: "chesapeake-bay-retriever",
    name: "Chesapeake Bay Retriever",
    size: "L", sizeOrder: 4,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 10, lifespanHigh: 13,
    origin: "USA", originRegion: "North America",
    dogCeoPath: "retriever/chesapeake",
    petfinderName: "Chesapeake Bay Retriever"
  },
  {
    // English Setter: 45–80 lbs (L), medium feathered coat, UK, 12 yrs
    id: "english-setter",
    name: "English Setter",
    size: "L", sizeOrder: 4,
    shed: "Moderate", shedOrder: 2,
    groom: "Moderate", groomOrder: 2,
    coat: "Medium",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 14,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "setter/english",
    petfinderName: "Setter, English"
  },
  {
    // English Springer Spaniel: 40–50 lbs (M), medium coat, UK, 12–14 yrs
    id: "english-springer-spaniel",
    name: "English Springer Spaniel",
    size: "M", sizeOrder: 3,
    shed: "Moderate", shedOrder: 2,
    groom: "Moderate", groomOrder: 2,
    coat: "Medium",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 14,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "springer/english",
    petfinderName: "English Springer Spaniel"
  },
  {
    // Giant Schnauzer: 55–85 lbs (L), wire coat, Germany, 12–15 yrs
    id: "giant-schnauzer",
    name: "Giant Schnauzer",
    size: "L", sizeOrder: 4,
    shed: "Low", shedOrder: 1,
    groom: "High", groomOrder: 3,
    coat: "Wire",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 15,
    origin: "Germany", originRegion: "Europe",
    dogCeoPath: "schnauzer/giant",
    petfinderName: "Schnauzer, Giant"
  },
  {
    // Great Pyrenees: 85–115+ lbs (XL), long thick coat, France, 10–12 yrs
    id: "great-pyrenees",
    name: "Great Pyrenees",
    size: "XL", sizeOrder: 5,
    shed: "High", shedOrder: 3,
    groom: "Moderate", groomOrder: 2,
    coat: "Long",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 10, lifespanHigh: 12,
    origin: "France", originRegion: "Europe",
    dogCeoPath: "pyrenees",
    petfinderName: "Great Pyrenees"
  },
  {
    // Irish Wolfhound: 105–120+ lbs (XL), wire coat, Ireland, 6–8 yrs
    id: "irish-wolfhound",
    name: "Irish Wolfhound",
    size: "XL", sizeOrder: 5,
    shed: "Moderate", shedOrder: 2,
    groom: "Moderate", groomOrder: 2,
    coat: "Wire",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 6, lifespanHigh: 8,
    origin: "Ireland", originRegion: "Europe",
    dogCeoPath: "wolfhound/irish",
    petfinderName: "Irish Wolfhound"
  },
  {
    // Keeshond: 35–45 lbs (M), thick double coat (medium), Netherlands, 12–15 yrs
    id: "keeshond",
    name: "Keeshond",
    size: "M", sizeOrder: 3,
    shed: "High", shedOrder: 3,
    groom: "Moderate", groomOrder: 2,
    coat: "Medium",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 12, lifespanHigh: 15,
    origin: "Netherlands", originRegion: "Europe",
    dogCeoPath: "keeshond",
    petfinderName: "Keeshond"
  },
  {
    // Komondor: 80–100+ lbs (XL), corded coat (Long), Hungary, 10–12 yrs
    id: "komondor",
    name: "Komondor",
    size: "XL", sizeOrder: 5,
    shed: "Low", shedOrder: 1,
    groom: "High", groomOrder: 3,
    coat: "Long",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 10, lifespanHigh: 12,
    origin: "Hungary", originRegion: "Europe",
    dogCeoPath: "komondor",
    petfinderName: "Komondor"
  },
  {
    // Leonberger: 90–170 lbs (XL), lion-like mane, long coat, Germany, 7 yrs
    id: "leonberger",
    name: "Leonberger",
    size: "XL", sizeOrder: 5,
    shed: "High", shedOrder: 3,
    groom: "Moderate", groomOrder: 2,
    coat: "Long",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 7, lifespanHigh: 10,
    origin: "Germany", originRegion: "Europe",
    dogCeoPath: "leonberg",
    petfinderName: "Leonberger"
  },
  {
    // Lhasa Apso: 12–18 lbs (S), long flowing coat, Tibet/China, 12–15 yrs
    id: "lhasa-apso",
    name: "Lhasa Apso",
    size: "S", sizeOrder: 2,
    shed: "Low", shedOrder: 1,
    groom: "High", groomOrder: 3,
    coat: "Long",
    active: "Low", activeOrder: 1,
    lifespanLow: 12, lifespanHigh: 15,
    origin: "Tibet", originRegion: "Asia",
    dogCeoPath: "lhasa",
    petfinderName: "Lhasa Apso"
  },
  {
    // Miniature Pinscher: 8–10 lbs (XS), short coat, Germany, 12–16 yrs
    id: "miniature-pinscher",
    name: "Miniature Pinscher",
    size: "XS", sizeOrder: 1,
    shed: "Low", shedOrder: 1,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 16,
    origin: "Germany", originRegion: "Europe",
    dogCeoPath: "pinscher/miniature",
    petfinderName: "Miniature Pinscher"
  },
  {
    // Newfoundland: 100–150 lbs (XL), thick double coat (long), Canada, 9–10 yrs
    id: "newfoundland",
    name: "Newfoundland",
    size: "XL", sizeOrder: 5,
    shed: "High", shedOrder: 3,
    groom: "Moderate", groomOrder: 2,
    coat: "Long",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 9, lifespanHigh: 10,
    origin: "Canada", originRegion: "North America",
    dogCeoPath: "newfoundland",
    petfinderName: "Newfoundland"
  },
  {
    // Norwegian Elkhound: 48–55 lbs (M), medium double coat, Norway, 12–15 yrs
    id: "norwegian-elkhound",
    name: "Norwegian Elkhound",
    size: "M", sizeOrder: 3,
    shed: "High", shedOrder: 3,
    groom: "Moderate", groomOrder: 2,
    coat: "Medium",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 15,
    origin: "Norway", originRegion: "Europe",
    dogCeoPath: "elkhound/norwegian",
    petfinderName: "Norwegian Elkhound"
  },
  {
    // Otterhound: 65–115 lbs (L–XL); males 115 lbs, females 65 lbs — L is standard classification
    id: "otterhound",
    name: "Otterhound",
    size: "L", sizeOrder: 4,
    shed: "Moderate", shedOrder: 2,
    groom: "Moderate", groomOrder: 2,
    coat: "Wire",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 10, lifespanHigh: 13,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "otterhound",
    petfinderName: "Otterhound"
  },
  {
    // Pekingese: up to 14 lbs (S), long double coat, China, 12–14 yrs
    id: "pekingese",
    name: "Pekingese",
    size: "S", sizeOrder: 2,
    shed: "Moderate", shedOrder: 2,
    groom: "High", groomOrder: 3,
    coat: "Long",
    active: "Low", activeOrder: 1,
    lifespanLow: 12, lifespanHigh: 14,
    origin: "China", originRegion: "Asia",
    dogCeoPath: "pekinese",
    petfinderName: "Pekingese"
  },
  {
    // Pit Bull (American Pit Bull Terrier): 30–65 lbs (M), short coat, USA, 12–16 yrs
    id: "pit-bull",
    name: "Pit Bull",
    size: "M", sizeOrder: 3,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 16,
    origin: "USA", originRegion: "North America",
    dogCeoPath: "pitbull",
    petfinderName: "Pit Bull Terrier"
  },
  {
    // Rhodesian Ridgeback: 70–85 lbs (L), short coat, Zimbabwe/South Africa, 10–12 yrs
    id: "rhodesian-ridgeback",
    name: "Rhodesian Ridgeback",
    size: "L", sizeOrder: 4,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 10, lifespanHigh: 12,
    origin: "Zimbabwe", originRegion: "Africa",
    dogCeoPath: "ridgeback/rhodesian",
    petfinderName: "Rhodesian Ridgeback"
  },
  {
    // Rough Collie: 50–75 lbs (L), long double coat, UK, 12–14 yrs
    id: "rough-collie",
    name: "Rough Collie",
    size: "L", sizeOrder: 4,
    shed: "High", shedOrder: 3,
    groom: "High", groomOrder: 3,
    coat: "Long",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 12, lifespanHigh: 14,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "rough/collie",
    petfinderName: "Collie (Rough)"
  },
  {
    // Saluki: 35–65 lbs (L), long silky feathered coat, Middle East, 10–17 yrs
    id: "saluki",
    name: "Saluki",
    size: "L", sizeOrder: 4,
    shed: "Low", shedOrder: 1,
    groom: "Low", groomOrder: 1,
    coat: "Long",
    active: "High", activeOrder: 3,
    lifespanLow: 10, lifespanHigh: 17,
    origin: "Iran", originRegion: "Middle East",
    dogCeoPath: "saluki",
    petfinderName: "Saluki"
  },
  {
    // Shar-Pei: 45–60 lbs (M), short bristly coat, China, 8–12 yrs
    id: "shar-pei",
    name: "Shar-Pei",
    size: "M", sizeOrder: 3,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "Low", activeOrder: 1,
    lifespanLow: 8, lifespanHigh: 12,
    origin: "China", originRegion: "Asia",
    dogCeoPath: "sharpei",
    petfinderName: "Chinese Shar-Pei"
  },
  {
    // Shiba Inu: 17–23 lbs (S), short double coat, Japan, 13–16 yrs
    id: "shiba-inu",
    name: "Shiba Inu",
    size: "S", sizeOrder: 2,
    shed: "High", shedOrder: 3,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 13, lifespanHigh: 16,
    origin: "Japan", originRegion: "Asia",
    dogCeoPath: "shiba",
    petfinderName: "Shiba Inu"
  },
  {
    // Scottish Terrier: 18–22 lbs (S), wire coat, Scotland/UK, 12 yrs
    id: "scottish-terrier",
    name: "Scottish Terrier",
    size: "S", sizeOrder: 2,
    shed: "Low", shedOrder: 1,
    groom: "High", groomOrder: 3,
    coat: "Wire",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 11, lifespanHigh: 13,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "terrier/scottish",
    petfinderName: "Scottish Terrier"
  },
  {
    // Soft Coated Wheaten Terrier: 30–45 lbs (M), soft wavy coat, Ireland, 12–14 yrs
    id: "soft-coated-wheaten-terrier",
    name: "Soft Coated Wheaten Terrier",
    size: "M", sizeOrder: 3,
    shed: "Low", shedOrder: 1,
    groom: "High", groomOrder: 3,
    coat: "Curly",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 14,
    origin: "Ireland", originRegion: "Europe",
    dogCeoPath: "terrier/wheaten",
    petfinderName: "Soft Coated Wheaten Terrier"
  },
  {
    // St. Bernard: 120–180 lbs (XL), long or short coat, Switzerland, 8–10 yrs
    id: "st-bernard",
    name: "St. Bernard",
    size: "XL", sizeOrder: 5,
    shed: "High", shedOrder: 3,
    groom: "Moderate", groomOrder: 2,
    coat: "Long",
    active: "Low", activeOrder: 1,
    lifespanLow: 8, lifespanHigh: 10,
    origin: "Switzerland", originRegion: "Europe",
    dogCeoPath: "stbernard",
    petfinderName: "St. Bernard"
  },
  {
    // Staffordshire Bull Terrier: 24–38 lbs (M), short coat, UK, 12–14 yrs
    id: "staffordshire-bull-terrier",
    name: "Staffordshire Bull Terrier",
    size: "M", sizeOrder: 3,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 14,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "bullterrier/staffordshire",
    petfinderName: "Staffordshire Bull Terrier"
  },
  {
    // West Highland White Terrier: 15–22 lbs (S), wire double coat, Scotland/UK, 13–15 yrs
    id: "west-highland-white-terrier",
    name: "West Highland White Terrier",
    size: "S", sizeOrder: 2,
    shed: "Low", shedOrder: 1,
    groom: "High", groomOrder: 3,
    coat: "Wire",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 13, lifespanHigh: 15,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "terrier/westhighland",
    petfinderName: "West Highland White Terrier"
  },
  {
    // Xoloitzcuintli: 10–50 lbs — toy/miniature/standard; standard 30–55 lbs (M); hairless
    id: "xoloitzcuintli",
    name: "Xoloitzcuintli",
    size: "M", sizeOrder: 3,
    shed: "Low", shedOrder: 1,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 13, lifespanHigh: 18,
    origin: "Mexico", originRegion: "North America",
    dogCeoPath: "mexicanhairless",
    petfinderName: "Xoloitzcuintli"
  },

  // --- TERRIERS ---

  {
    // Bedlington Terrier: 17–23 lbs (S), curly lamb-like coat, UK, 11–16 yrs
    id: "bedlington-terrier",
    name: "Bedlington Terrier",
    size: "S", sizeOrder: 2,
    shed: "Low", shedOrder: 1,
    groom: "High", groomOrder: 3,
    coat: "Curly",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 11, lifespanHigh: 16,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "terrier/bedlington",
    petfinderName: "Bedlington Terrier"
  },
  {
    // Border Terrier: 11–16 lbs (S), wiry dense coat, UK, 12–15 yrs
    id: "border-terrier",
    name: "Border Terrier",
    size: "S", sizeOrder: 2,
    shed: "Low", shedOrder: 1,
    groom: "Moderate", groomOrder: 2,
    coat: "Wire",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 15,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "terrier/border",
    petfinderName: "Border Terrier"
  },
  {
    // Irish Terrier: 25–27 lbs (S/M border — classified M by weight), wiry coat, Ireland, 13–15 yrs
    id: "irish-terrier",
    name: "Irish Terrier",
    size: "M", sizeOrder: 3,
    shed: "Low", shedOrder: 1,
    groom: "Moderate", groomOrder: 2,
    coat: "Wire",
    active: "High", activeOrder: 3,
    lifespanLow: 13, lifespanHigh: 15,
    origin: "Ireland", originRegion: "Europe",
    dogCeoPath: "terrier/irish",
    petfinderName: "Irish Terrier"
  },
  {
    // Kerry Blue Terrier: 33–40 lbs (M), soft wavy blue coat, Ireland, 13–15 yrs
    id: "kerry-blue-terrier",
    name: "Kerry Blue Terrier",
    size: "M", sizeOrder: 3,
    shed: "Low", shedOrder: 1,
    groom: "High", groomOrder: 3,
    coat: "Curly",
    active: "High", activeOrder: 3,
    lifespanLow: 13, lifespanHigh: 15,
    origin: "Ireland", originRegion: "Europe",
    dogCeoPath: "terrier/kerryblue",
    petfinderName: "Kerry Blue Terrier"
  },
  {
    // Lakeland Terrier: 17 lbs (S), wire coat, UK, 12–15 yrs
    id: "lakeland-terrier",
    name: "Lakeland Terrier",
    size: "S", sizeOrder: 2,
    shed: "Low", shedOrder: 1,
    groom: "Moderate", groomOrder: 2,
    coat: "Wire",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 15,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "terrier/lakeland",
    petfinderName: "Lakeland Terrier"
  },
  {
    // Norfolk Terrier: 11–12 lbs (XS/S border — classified S), wire coat, UK, 12–15 yrs
    id: "norfolk-terrier",
    name: "Norfolk Terrier",
    size: "S", sizeOrder: 2,
    shed: "Low", shedOrder: 1,
    groom: "Moderate", groomOrder: 2,
    coat: "Wire",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 15,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "terrier/norfolk",
    petfinderName: "Norfolk Terrier"
  },
  {
    // Norwich Terrier: 12 lbs (S), wire coat, UK, 12–15 yrs
    id: "norwich-terrier",
    name: "Norwich Terrier",
    size: "S", sizeOrder: 2,
    shed: "Low", shedOrder: 1,
    groom: "Moderate", groomOrder: 2,
    coat: "Wire",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 15,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "terrier/norwich",
    petfinderName: "Norwich Terrier"
  },
  {
    // Silky Terrier: 8–10 lbs (XS), long silky coat, Australia, 13–15 yrs
    id: "silky-terrier",
    name: "Silky Terrier",
    size: "XS", sizeOrder: 1,
    shed: "Low", shedOrder: 1,
    groom: "High", groomOrder: 3,
    coat: "Long",
    active: "High", activeOrder: 3,
    lifespanLow: 13, lifespanHigh: 15,
    origin: "Australia", originRegion: "Oceania",
    dogCeoPath: "terrier/silky",
    petfinderName: "Silky Terrier"
  },
  {
    // Welsh Terrier: 20–22 lbs (S), wire coat, Wales/UK, 12–15 yrs
    id: "welsh-terrier",
    name: "Welsh Terrier",
    size: "S", sizeOrder: 2,
    shed: "Low", shedOrder: 1,
    groom: "Moderate", groomOrder: 2,
    coat: "Wire",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 15,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "terrier/welsh",
    petfinderName: "Welsh Terrier"
  },
  {
    // Dandie Dinmont Terrier: 18–24 lbs (S), crisp topknot/soft body coat, UK, 12–15 yrs
    id: "dandie-dinmont-terrier",
    name: "Dandie Dinmont Terrier",
    size: "S", sizeOrder: 2,
    shed: "Low", shedOrder: 1,
    groom: "Moderate", groomOrder: 2,
    coat: "Wire",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 12, lifespanHigh: 15,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "terrier/dandie",
    petfinderName: "Dandie Dinmont Terrier"
  },

  // --- SPANIELS ---

  {
    // Clumber Spaniel: 55–85 lbs (L), dense medium coat, UK, 10–12 yrs
    id: "clumber-spaniel",
    name: "Clumber Spaniel",
    size: "L", sizeOrder: 4,
    shed: "High", shedOrder: 3,
    groom: "Moderate", groomOrder: 2,
    coat: "Medium",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 10, lifespanHigh: 12,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "clumber",
    petfinderName: "Clumber Spaniel"
  },
  {
    // Irish Water Spaniel: 45–65 lbs (M), tight curly water-resistant coat, Ireland, 12–13 yrs
    id: "irish-water-spaniel",
    name: "Irish Water Spaniel",
    size: "M", sizeOrder: 3,
    shed: "Low", shedOrder: 1,
    groom: "Moderate", groomOrder: 2,
    coat: "Curly",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 13,
    origin: "Ireland", originRegion: "Europe",
    dogCeoPath: "spaniel/irish",
    petfinderName: "Irish Water Spaniel"
  },
  {
    // Welsh Springer Spaniel: 35–55 lbs (M), medium silky coat, Wales/UK, 12–15 yrs
    id: "welsh-springer-spaniel",
    name: "Welsh Springer Spaniel",
    size: "M", sizeOrder: 3,
    shed: "Moderate", shedOrder: 2,
    groom: "Moderate", groomOrder: 2,
    coat: "Medium",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 15,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "spaniel/welsh",
    petfinderName: "Welsh Springer Spaniel"
  },
  {
    // Sussex Spaniel: 35–45 lbs (M), medium wavy coat, UK, 13–15 yrs
    id: "sussex-spaniel",
    name: "Sussex Spaniel",
    size: "M", sizeOrder: 3,
    shed: "Moderate", shedOrder: 2,
    groom: "Moderate", groomOrder: 2,
    coat: "Medium",
    active: "Low", activeOrder: 1,
    lifespanLow: 13, lifespanHigh: 15,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "spaniel/sussex",
    petfinderName: "Sussex Spaniel"
  },

  // --- RETRIEVERS & SETTERS ---

  {
    // Curly-Coated Retriever: 60–95 lbs (L), tight curly coat, UK, 10–12 yrs
    id: "curly-coated-retriever",
    name: "Curly-Coated Retriever",
    size: "L", sizeOrder: 4,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Curly",
    active: "High", activeOrder: 3,
    lifespanLow: 10, lifespanHigh: 12,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "retriever/curly",
    petfinderName: "Curly-Coated Retriever"
  },
  {
    // Flat-Coated Retriever: 55–70 lbs (L), dense flat medium coat, UK, 8–10 yrs
    id: "flat-coated-retriever",
    name: "Flat-Coated Retriever",
    size: "L", sizeOrder: 4,
    shed: "Moderate", shedOrder: 2,
    groom: "Moderate", groomOrder: 2,
    coat: "Medium",
    active: "High", activeOrder: 3,
    lifespanLow: 8, lifespanHigh: 10,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "retriever/flatcoated",
    petfinderName: "Flat-Coated Retriever"
  },
  {
    // Gordon Setter: 45–80 lbs (L), medium silky coat, Scotland/UK, 12–13 yrs
    id: "gordon-setter",
    name: "Gordon Setter",
    size: "L", sizeOrder: 4,
    shed: "Moderate", shedOrder: 2,
    groom: "Moderate", groomOrder: 2,
    coat: "Medium",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 13,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "setter/gordon",
    petfinderName: "Setter, Gordon"
  },

  // --- HOUNDS ---

  {
    // Ibizan Hound: 45–50 lbs (M), short smooth or wire coat, Spain (Ibiza), 11–14 yrs
    id: "ibizan-hound",
    name: "Ibizan Hound",
    size: "M", sizeOrder: 3,
    shed: "Low", shedOrder: 1,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 11, lifespanHigh: 14,
    origin: "Spain", originRegion: "Europe",
    dogCeoPath: "hound/ibizan",
    petfinderName: "Ibizan Hound"
  },
  {
    // Scottish Deerhound: 75–110 lbs (L–XL); standard classified L, wire/shaggy coat, UK, 8–11 yrs
    id: "scottish-deerhound",
    name: "Scottish Deerhound",
    size: "L", sizeOrder: 4,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Wire",
    active: "High", activeOrder: 3,
    lifespanLow: 8, lifespanHigh: 11,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "deerhound/scottish",
    petfinderName: "Scottish Deerhound"
  },

  // --- HERDING & WORKING ---

  {
    // Old English Sheepdog: 60–100 lbs (L), long thick shaggy coat, UK, 10–12 yrs
    id: "old-english-sheepdog",
    name: "Old English Sheepdog",
    size: "L", sizeOrder: 4,
    shed: "High", shedOrder: 3,
    groom: "High", groomOrder: 3,
    coat: "Long",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 10, lifespanHigh: 12,
    origin: "UK", originRegion: "Europe",
    dogCeoPath: "sheepdog/english",
    petfinderName: "Old English Sheepdog"
  },
  {
    // Belgian Tervuren: 45–75 lbs (L), long double coat, Belgium, 14–16 yrs
    id: "belgian-tervuren",
    name: "Belgian Tervuren",
    size: "L", sizeOrder: 4,
    shed: "High", shedOrder: 3,
    groom: "Moderate", groomOrder: 2,
    coat: "Long",
    active: "High", activeOrder: 3,
    lifespanLow: 14, lifespanHigh: 16,
    origin: "Belgium", originRegion: "Europe",
    dogCeoPath: "tervuren",
    petfinderName: "Belgian Tervuren"
  },
  {
    // Belgian Groenendael (Belgian Sheepdog): 45–75 lbs (L), long black double coat, Belgium, 14–16 yrs
    id: "belgian-groenendael",
    name: "Belgian Groenendael",
    size: "L", sizeOrder: 4,
    shed: "High", shedOrder: 3,
    groom: "Moderate", groomOrder: 2,
    coat: "Long",
    active: "High", activeOrder: 3,
    lifespanLow: 14, lifespanHigh: 16,
    origin: "Belgium", originRegion: "Europe",
    dogCeoPath: "groenendael",
    petfinderName: "Belgian Sheepdog"
  },
  {
    // Bouvier des Flandres: 70–110 lbs (XL), rough double coat, Belgium, 10–12 yrs
    id: "bouvier-des-flandres",
    name: "Bouvier des Flandres",
    size: "XL", sizeOrder: 5,
    shed: "Low", shedOrder: 1,
    groom: "High", groomOrder: 3,
    coat: "Wire",
    active: "High", activeOrder: 3,
    lifespanLow: 10, lifespanHigh: 12,
    origin: "Belgium", originRegion: "Europe",
    dogCeoPath: "bouvier",
    petfinderName: "Bouvier des Flandres"
  },
  {
    // Briard: 55–100 lbs (L), long wavy double coat, France, 12 yrs
    id: "briard",
    name: "Briard",
    size: "L", sizeOrder: 4,
    shed: "Moderate", shedOrder: 2,
    groom: "High", groomOrder: 3,
    coat: "Long",
    active: "High", activeOrder: 3,
    lifespanLow: 10, lifespanHigh: 12,
    origin: "France", originRegion: "Europe",
    dogCeoPath: "briard",
    petfinderName: "Briard"
  },
  {
    // Appenzeller Mountain Dog: 48–70 lbs (M), short tricolor coat, Switzerland, 12–15 yrs
    id: "appenzeller-mountain-dog",
    name: "Appenzeller Mountain Dog",
    size: "M", sizeOrder: 3,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 12, lifespanHigh: 15,
    origin: "Switzerland", originRegion: "Europe",
    dogCeoPath: "appenzeller",
    petfinderName: "Appenzeller Mountain Dog"
  },
  {
    // Entlebucher Mountain Dog: 40–65 lbs (M), short tricolor coat, Switzerland, 11–13 yrs
    id: "entlebucher-mountain-dog",
    name: "Entlebucher Mountain Dog",
    size: "M", sizeOrder: 3,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 11, lifespanHigh: 13,
    origin: "Switzerland", originRegion: "Europe",
    dogCeoPath: "entlebucher",
    petfinderName: "Entlebucher Mountain Dog"
  },
  {
    // Greater Swiss Mountain Dog: 85–140 lbs (XL), short dense tricolor coat, Switzerland, 8–11 yrs
    id: "greater-swiss-mountain-dog",
    name: "Greater Swiss Mountain Dog",
    size: "XL", sizeOrder: 5,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 8, lifespanHigh: 11,
    origin: "Switzerland", originRegion: "Europe",
    dogCeoPath: "mountain/swiss",
    petfinderName: "Greater Swiss Mountain Dog"
  },
  {
    // Kuvasz: 70–115 lbs (L–XL); classified L, white long double coat, Hungary, 10–12 yrs
    id: "kuvasz",
    name: "Kuvasz",
    size: "L", sizeOrder: 4,
    shed: "High", shedOrder: 3,
    groom: "Moderate", groomOrder: 2,
    coat: "Long",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 10, lifespanHigh: 12,
    origin: "Hungary", originRegion: "Europe",
    dogCeoPath: "kuvasz",
    petfinderName: "Kuvasz"
  },

  // --- OTHER ---

  {
    // American Eskimo Dog: 6–35 lbs — standard size 25–35 lbs (M); long white double coat, USA, 13–15 yrs
    id: "american-eskimo-dog",
    name: "American Eskimo Dog",
    size: "M", sizeOrder: 3,
    shed: "High", shedOrder: 3,
    groom: "Moderate", groomOrder: 2,
    coat: "Long",
    active: "High", activeOrder: 3,
    lifespanLow: 13, lifespanHigh: 15,
    origin: "USA", originRegion: "North America",
    dogCeoPath: "eskimo",
    petfinderName: "American Eskimo Dog"
  },
  {
    // Norwegian Buhund: 26–40 lbs (M), medium double coat, Norway, 13–15 yrs
    id: "norwegian-buhund",
    name: "Norwegian Buhund",
    size: "M", sizeOrder: 3,
    shed: "Moderate", shedOrder: 2,
    groom: "Moderate", groomOrder: 2,
    coat: "Medium",
    active: "High", activeOrder: 3,
    lifespanLow: 13, lifespanHigh: 15,
    origin: "Norway", originRegion: "Europe",
    dogCeoPath: "buhund/norwegian",
    petfinderName: "Norwegian Buhund"
  },
  {
    // Schipperke: 10–16 lbs (S), dense double coat (short/medium), Belgium, 13–15 yrs
    id: "schipperke",
    name: "Schipperke",
    size: "S", sizeOrder: 2,
    shed: "Moderate", shedOrder: 2,
    groom: "Low", groomOrder: 1,
    coat: "Short",
    active: "High", activeOrder: 3,
    lifespanLow: 13, lifespanHigh: 15,
    origin: "Belgium", originRegion: "Europe",
    dogCeoPath: "schipperke",
    petfinderName: "Schipperke"
  },
  {
    // Coton de Tulear: 8–15 lbs (S), long cottony white coat, Madagascar, 15–19 yrs
    id: "coton-de-tulear",
    name: "Coton de Tulear",
    size: "S", sizeOrder: 2,
    shed: "Low", shedOrder: 1,
    groom: "High", groomOrder: 3,
    coat: "Long",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 15, lifespanHigh: 19,
    origin: "Madagascar", originRegion: "Africa",
    dogCeoPath: "cotondetulear",
    petfinderName: "Coton de Tulear"
  },
  {
    // Brussels Griffon: 8–10 lbs (XS), rough or smooth coat, Belgium, 12–15 yrs
    id: "brussels-griffon",
    name: "Brussels Griffon",
    size: "XS", sizeOrder: 1,
    shed: "Low", shedOrder: 1,
    groom: "Moderate", groomOrder: 2,
    coat: "Wire",
    active: "Moderate", activeOrder: 2,
    lifespanLow: 12, lifespanHigh: 15,
    origin: "Belgium", originRegion: "Europe",
    dogCeoPath: "brabancon",
    petfinderName: "Brussels Griffon"
  }
];

// Lookup maps built once
export const BREED_BY_ID = Object.fromEntries(BREEDS.map(b => [b.id, b]));
export const BREED_BY_NAME = Object.fromEntries(BREEDS.map(b => [b.name.toLowerCase(), b]));
