import bodyParser from "body-parser";
import axios from "axios";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer"
import fetch from "node-fetch"

const app = express();
const port = 8080;
const LINK_URL = "https://api.tinyurl.com/create"
const BearerToken = process.env.API_TOKEN;
const server_email = process.env.EMAIL_ADDRESS;
const server_email_pass = process.env.EMAIL_PASSWORD;

let shortened = ''

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
    res.render("index.ejs", {shortened : shortened});
});

app.get("/about", (req, res) => {
    res.render("about", );
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
    
        shortened = response.data.data.tiny_url
        
        // Log the response from the API
        
        console.log(response.data.data.tiny_url);
    
        // You can send the shortened URL or other relevant data to the client

        res.redirect('/')
        

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
            user: server_email,
            pass: server_email_pass
        }
    })

    async function main() {
        const info = await transporter.sendMail({
            from : `"Gaspar, from Syntaxis" <${server_email}>`,
            to: req.body.email,
            subject : `Your feedback has been received!`,
            html: `
            <h2>Thank you for your feedback!</h2>
            <p>Hi, ${req.body.full_name}!</p>
            <p>We’ve received your feedback with the subject <b>${req.body.subject}</b> and it will be taken into consideration for future updates to the app.</p>
            <p>Your input is invaluable to us, and we’re always working to improve the user experience.</p>
            <p>Best regards, <br> The Syntaxis Team</p>

            `,
        })


        // sending data to google forms

        const formData = new URLSearchParams();
        formData.append('entry.564836964', req.body.full_name)
        formData.append('entry.123566139', req.body.email)
        formData.append('entry.64796350', req.body.subject)
        formData.append('entry.184176017', req.body.message)

        const googleFormURL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfHoEghmSgBW8E14VRUqLO6hibuGK0aYiP5_V48wmMplmeKbA/formResponse';

        const response = await fetch(googleFormURL, {
            method: 'POST',
            body: formData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })


        console.log("message sent: %s", info.messageId)
        const result = await response.text();
        console.log('Form submitted to Google Form (preview):', result.substring(0, 200)); // Exibe os primeiros 200 caracteres
    }

    main().catch(console.error);

})

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
