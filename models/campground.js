const mongoose = require("mongoose");
const Review = require("./review");
const { cloudinary } = require("../cloudinary");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema(
  {
    title: String,
    images: [ImageSchema],
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    price: Number,
    description: String,
    location: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  opts
);

CampgroundSchema.virtual("properties.popUpMarkup").get(function () {
  return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
          <p>${this.description.substring(0, 20)}...</p>`;
});

CampgroundSchema.methods.calculateAvgRating = function () {
  let ratingsTotal = 0;
  if (this.reviews.length) {
    this.reviews.forEach((review) => (ratingsTotal += review.rating));
    this.avgRating = Math.round((ratingsTotal / this.reviews.length) * 10) / 10;
  } else this.avgRating = ratingsTotal;
  const floorRating = Math.floor(this.avgRating);
  this.save();
  return floorRating;
};

CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: { $in: doc.reviews },
    });
    for (let img of doc.images) await cloudinary.uploader.destroy(img.filename);
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
