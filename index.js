import bodyParser from "body-parser";
import axios from "axios";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer"

const app = express();
const port = 8080;
const LINK_URL = "https://api.tinyurl.com/create"
const BearerToken = process.env.API_TOKEN;
const my_email = process.env.EMAIL_ADDRESS;
const my_pass = process.env.EMAIL_PASSWORD;

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
        console.log(response.data.data.tiny_url);
    
        // You can send the shortened URL or other relevant data to the client
        

        } catch (error) {
            console.log(`Error: ${error.message}`);
            console.log(error.response?.data);

            res.status(500).send("An error occurred while shortening the link.");
        }
});

app.post('/send-email',(req, res)=>{
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: my_email,
            pass: my_pass
        }
    })

    async function main() {
        const info = await transporter.sendMail({
            from : req.body.email,
            to: my_email,
            subject : `${req.body.subject}`,
            html: `${req.body.message}`,
            replyTo: req.body.email,

        })

        console.log("message sent: %s", info.messageId)
    }

    main().catch(console.error);

})

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
