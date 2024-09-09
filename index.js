require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

app.post('/send-email', async (req, res) => {
  const {text, clientMail, fName, lName, number} = req.body;
  
  try {
    // Send notification email to yourself
    const notificationEmail = await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: 'Enquiry Request',
      html: `
        <p>${text}</p>
        <h3>You got an Enquiry Request From:</h3>
        <ul>
          <li>Email: ${clientMail}</li>
          <li>Name: ${fName} ${lName}</li>
          <li>Phone: ${number}</li>
        </ul>
        <p>Thank you, MHJ</p>
      `
    });

    // Send confirmation email to the client
    const confirmationEmail = await transporter.sendMail({
      from: process.env.EMAIL,
      to: clientMail,
      subject: 'Confirmation of Your Enquiry',
      html: `
        <h2>Thank you for your enquiry, ${fName}!</h2>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Here's a summary of your enquiry:</p>
        <p>${text}</p>
        <p>Best regards,<br>MHJ Team</p>
      `
    });

    if (notificationEmail.accepted.length > 0 && confirmationEmail.accepted.length > 0) {
      res.status(200).send('Emails sent successfully');
    } else {
      res.status(500).send('Error sending one or both emails');
    }
   
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));