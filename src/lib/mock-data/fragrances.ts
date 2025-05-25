export const mockFragrances = [
  {
    id: "1",
    name: "Aventus",
    brand: "Creed",
    description: "A sophisticated blend of fruity and smoky notes",
    notes: ["bergamot", "blackcurrant", "apple", "rose", "birch", "musk", "oakmoss", "ambergris"],
    concentration: "Eau de Parfum",
    yearReleased: 2010,
  },
  {
    id: "2", 
    name: "Bleu de Chanel",
    brand: "Chanel",
    description: "A fresh, clean, and profoundly sensual fragrance",
    notes: ["grapefruit", "lemon", "mint", "pink pepper", "ginger", "cedar", "sandalwood", "amberwood"],
    concentration: "Eau de Toilette",
    yearReleased: 2010,
  },
  {
    id: "3",
    name: "Tom Ford Oud Wood",
    brand: "Tom Ford",
    description: "A smooth, sensual, and warm composition",
    notes: ["oud", "rosewood", "cardamom", "sandalwood", "palisander", "amber", "vanilla"],
    concentration: "Eau de Parfum", 
    yearReleased: 2007,
  },
  {
    id: "4",
    name: "Dior Sauvage",
    brand: "Dior",
    description: "A radically fresh composition with a powerful and noble trail",
    notes: ["bergamot", "pepper", "lavender", "star anise", "nutmeg", "ambroxan"],
    concentration: "Eau de Toilette",
    yearReleased: 2015,
  },
  {
    id: "5",
    name: "YSL La Nuit de L'Homme",
    brand: "Yves Saint Laurent",
    description: "A seductive and mysterious fragrance for the modern man",
    notes: ["cardamom", "bergamot", "lavender", "cedar", "cumin", "vetiver"],
    concentration: "Eau de Toilette",
    yearReleased: 2009,
  }
];

export const mockCollections = [
  {
    id: "1",
    name: "Designer Classics",
    description: "Timeless fragrances from luxury fashion houses",
    fragrances: ["2", "4", "5"]
  },
  {
    id: "2", 
    name: "Niche Discoveries",
    description: "Unique and artistic fragrances from independent houses",
    fragrances: ["1", "3"]
  },
  {
    id: "3",
    name: "Summer Favorites", 
    description: "Fresh and light fragrances perfect for warm weather",
    fragrances: ["2", "4"]
  }
];