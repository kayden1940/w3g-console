const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");
// const User = require('./userModel');
// const validator = require('validator');

// const ratingSchema = new mongoose.Schema({
//   year: String,
//   rating: {
//     type: Number,
//     default: 0,
//   },
// });


const siteSchema = new Schema({
  name: {
    en: {
      type: String,
      required: [true, "A site must have a name"],
      unique: true,
      trim: true,
      maxlength: [30, "A site name must have less or equal then 30 characters"],
      minlength: [3, "A site name must have more or equal then 3 characters"],
      //   validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    original: {
      type: String,
      // unique: true,
      trim: true,
      maxlength: [30, "A site name must have less or equal then 30 characters"],
      minlength: [2, "A site name must have more or equal then 2 characters"],
      //   validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
  },
  purposes: {
    type: [String],
    required: [true, "A site must have a purpose"],
    enum: [
      "portfolio",
      "leaflet",
      "playground",
      "game",
      "artwork",
      "blog",
      "mystery",
      "service",
      "sns",
      "tool",
      "resource",
      "tutorial",
      "unknown",
    ],
    default: ["unknown"],
  },
  description: {
    type: String,
    required: [true, "A site must have a description"],
    trim: true,
  },
  url: {
    type: String,
    required: [true, "A site must have a url"],
    unique: true,
    trim: true,
    maxlength: [80, "A site url must have less or equal then 80 characters"],
    minlength: [17, "A site url must have more or equal then 17 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  topic: {
    type: [String],
    // required: [true, "A site must have a topic"],
    enum: [
      "music",
      "design",
      "web",
      "graphic",
      "computerScience",
      "science",
      "math",
      "editing",
      "cookery",
    ],
  },
  accessibility: {
    type: String,
    required: [true, "A site must have a accessibility"],
    enum: ["full", "membership", "memberOnly", "private"],
    default: "full",
  },
  ownership: {
    type: String,
    required: [true, "A site must have a ownership"],
    enum: [
      "personal",
      "indie",
      "project",
      "company",
      "ngo",
      "gov",
      "decentral",
      "unknown",
    ],
    default: "unknown",
  },
  location: {
    type: String,
  },
  languages: {
    type: [String],
    default: ["English"],
  },
  runBy: {
    name: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  status: {
    type: String,
    required: [true, "A site must have a status"],
    enum: ["suspend", "running", "archive"]
  },
  profitability: {
    type: String,
    required: [true, "A site must have a profitability"],
    enum: ["free", "freeWithDonate", "freeWithPay", "payOnly"],
    default: "free",
  },
  warnings: {
    type: String,
    enum: ["flashing", "adult", "nsfw"],
  },
  slug: String,

  // imageCover: {
  //   type: String,
  //   required: [true, "A site must have a cover image"],
  // },
  // images: [String],
  // accessibility: {
  //   type: String,
  //   required: [true, "A site must have a accessibility"],
  //   enum: ["full", "membership", "memberOnly", "private"],
  // },
  created: {
    at: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    from: {
      type: Schema.Types.ObjectId,
      required: [true, "A site must have created by a Operator"],
      ref: "Operator",
    },
  },
});

// tourSchema.index({ price: 1 });
// tourSchema.index({ price: 1, ratingsAverage: -1 });
// tourSchema.index({ slug: 1 });
// tourSchema.index({ startLocation: "2dsphere" });

// tourSchema.virtual("durationWeeks").get(function () {
//   return this.duration / 7;
// });

// Virtual populate
// tourSchema.virtual("reviews", {
//   ref: "Review",
//   foreignField: "tour",
//   localField: "_id",
// });

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
siteSchema.pre("save", function (next) {
  this.slug = slugify(this.name.en, { lower: true });
  next();
});

// tourSchema.pre('save', async function(next) {
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// tourSchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// });

// tourSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
// tourSchema.pre('find', function(next) {
// tourSchema.pre(/^find/, function (next) {
//   this.find({ secretTour: { $ne: true } });

//   this.start = Date.now();
//   next();
// });

// tourSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "guides",
//     select: "-__v -passwordChangedAt",
//   });

//   next();
// });

// tourSchema.post(/^find/, function(docs, next) {
//   console.log(`Query took ${Date.now() - this.start} milliseconds!`);
//   next();
// });

// AGGREGATION MIDDLEWARE
// tourSchema.pre('aggregate', function(next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ ne: true } } });

//   console.log(this.pipeline());
//   next();
// });

const Site = mongoose.model("Site", siteSchema);

module.exports = Site;
