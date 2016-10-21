const properties = [
    {
      _id: "1",
      strings: {
        en: {
          title: "Ocean Bungalow BnB",
          tagline: "The best value in Tahiti",
          description: "Get breakfast in bed every day in an ocean bungalow."
        }, // other languages like french, spanish, etc
        fr: {
          title: "Mar Bungalowe", // min max validation, 4-64 required
          tagline: "something en français", // min max validation, 5-100 required
          description: "more in french" // min max validation, 10-2000 required
        }
      },
      type: "villa",
      diamonds: 3, // just an int entered by the user, optional, mix-max 1-5
      images: [ "property-image-url-1.jpg", "property-image-url-2.jpg" ], // all property images, images to be displayed in the same order of the array
      amenities: [
        { _id: "AMEN_ID1", name: "satellite tv" },
        { _id: "AMEN_ID2", name: "broadband internet" },
        { _id: "AMEN_ID3", name: "parking" }
      ],
      accessibilities: [
        { _id: "ACCESS_ID1", name: "stairs" },
        { _id: "ACCESS_ID2", name: "wheelchair" }
      ],
      activities: [
        { _id: "ACTIVITY_ID1", name: "pool" },
        { _id: "ACTIVITY_ID2", name: "bocce ball" }
      ],
      meals: [
        { _id: "MEALS_ID1", name: "all-inclusive" },
        { _id: "MEALS_ID2", name: "snacks" }
      ],
      near: [
        { _id: "NEAR_ID1", name: "transit" },
        { _id: "NEAR_ID2", name: "attractions" }
      ],
      houseRules: [ "No parties", "No shoes in the house" ],
      location: {}
    }
  ];

module.exports = properties;
