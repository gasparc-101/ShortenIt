import bodyParser from "body-parser";
import axios from "axios";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 8080;
const LINK_URL = "https://api.tinyurl.com/create"
const BearerToken = process.env.API_TOKEN;
const my_email = process.env.EMAIL_ADDRESS;

const config = {
    headers: { Authorization: `Bearer ${BearerToken}`,
    'Content-Type': 'application/json'
},
  };


// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());

// Route handlers
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/feedback", (req, res) => {
    res.render("feedback");
});

//api handling 

app.post("/submit-link", async (req, res)=>{

    console.log(req.body);
    try {
        const url = req.body.link;  // Extract the long URL from the request body
        console.log(url);
    
        // Use POST request to the TinyURL API
        const response = await axios.post(
            LINK_URL,
            {
                url: url, 
            },
                config
            );
    
        // Log the response from the API
        console.log(response.data);
    
        // You can send the shortened URL or other relevant data to the client
        res.json({ shortUrl: response.data.link });

        } catch (error) {
            console.log(`Error: ${error.message}`);
            console.log(error.response?.data);

            res.status(500).send("An error occurred while shortening the link.");
        }
});

app.post('/send-email',(req, res)=>{
    console.log(req.body)
})

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
