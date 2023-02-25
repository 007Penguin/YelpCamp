const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

// mongoose.connect('mongodb://localhost:27017/yelp-camp');
// mongoose.connect('"mongodb+srv://cluster0.6rqyrjm.mongodb.net/myFirstDatabase" --apiVersion 1 --username rosa071088');
mongoose.connect("mongodb+srv://rosa071088:u0Kjth0KfRuyvsXJ@cluster0.6rqyrjm.mongodb.net/?retryWrites=true&w=majority", {
    useUnifiedTopology: true
});


 



const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 70; i ++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() *20) +10;
        const camp = new Campground({
            author: '63f62b798713a650faccf15a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem consequuntur quam excepturi mollitia dignissimos. Ipsam, corrupti. Reiciendis magni excepturi quaerat numquam, aliquid suscipit ratione hic omnis nam voluptas fugit quidem.',
            price,
            geometry: {	
              type: "Point",	
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
            ]
          },
            images: [
                {
                  url: 'https://res.cloudinary.com/dhjsn7hdl/image/upload/v1676305136/YelpCamp/giul7ciec414twjjrdpr.jpg',
                  filename: 'YelpCamp/giul7ciec414twjjrdpr'
                },
                {
                  url: 'https://res.cloudinary.com/dhjsn7hdl/image/upload/v1676305136/YelpCamp/fbdsvbqzxxbsxttxqxk8.jpg',
                  filename: 'YelpCamp/fbdsvbqzxxbsxttxqxk8'
                }
              ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});