if (process.env.NODE_ENV !== "production") require("dotenv").config();

const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/yelpCamp");
}

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 500; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "66096d6d4113c20cfca9585d",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, quidem maxime molestias ullam recusandae officia, doloribus explicabo saepe iusto laboriosam similique? Aspernatur quidem adipisci sed excepturi. Ipsam laudantium doloremque tempora?",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dizxpd4cr/image/upload/v1712170322/YelpCamp/dino-reichmuth-5Rhl-kSRydQ-unsplash_plqnmm.jpg",
          filename: "YelpCamp/iqqzclcnzmppfmzlabou",
        },
        {
          url: "https://res.cloudinary.com/dizxpd4cr/image/upload/v1712170320/YelpCamp/glen-jackson-mzZVGFfMOkA-unsplash_madbup.jpg",
          filename: "YelpCamp/hs1uhe3tfpccm7vf2v1u",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
