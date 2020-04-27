const express = require("express");

const routes = require("./routes/api"); // email service route import from the API file

var cors = require("cors"); // Cross-origin resource sharing (CORS) allows AJAX requests to skip the Same-origin policy and access resources from remote hosts.

const app = express();

app.use(cors());

const uri =
	"mongodb+srv://rashmika:Rashmika@fashionstore-k14re.mongodb.net/test?retryWrites=true&w=majority";

app.use(express.json()); //  useNewUrlParser: true, useFindAndModify: false

app.use(express.urlencoded({ extended: true }));
/*
Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option. This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.
A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true).
*/

app.use("/", routes); // Use Api routes in the App

app.listen(4003, function () {
	// Launch app to listen to specified port

	console.log("now listening for requests");
});
