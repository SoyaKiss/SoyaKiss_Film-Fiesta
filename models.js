let mongoose = require("mongoose");
let bcrypt = require("bcrypt");

let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Year: { type: String, required: true },
  mainActor: {
    // Define mainActor as a nested object
    Name: { type: String, required: true },
    Birthday: Date,
  },
  supportingActor: {
    // Define supportingActor as a nested object
    Name: { type: String },
    Birthday: Date,
  },
  Genre: {
    Name: { type: String, required: true },
    Description: { type: String, required: true },
  },
  Description: { type: String, required: true },
  ImageURL: { type: String },
});

let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  fullName: { type: String, required: true },
  birthday: Date,
  favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
