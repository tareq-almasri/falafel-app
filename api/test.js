const mongoose=require('mongoose');

mongoose.connect(
  "mongodb+srv://alef:hello123@cluster0-2yq8x.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  },
  err => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

module.exports = (req, res) => {
   res.set("ACCESS-CONTROL-ALLOW-ORIGIN", "*");
   res.set("ACCESS-CONTROL-ALLOW-HEADERS", "*");
   res.set("ACCESS-CONTROL-ALLOW-METHODS", "*");
  
  res.status(200).send({ greeting: `Hello ${req.body.name}!` });
};;