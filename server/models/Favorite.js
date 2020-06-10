var mongoose        = require("mongoose");
var Schema          = mongoose.Schema;

var FavoriteSchema = new Schema({
    userId: String,
    artist: String,
    title: String,
    album: String,
    cover: String,
    cover_medium: String,
    date:  Date
});

module.exports = mongoose.model("Favorite", FavoriteSchema,"favorite");