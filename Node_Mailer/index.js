const { sendEmail } = require("./email");

const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Template</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f4f7;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      background: #ffffff;
      margin: 30px auto;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      background-color: #4f46e5;
      color: #ffffff;
      text-align: center;
      padding: 20px 10px;
    }
    .header h2 {
      margin: 0;
      font-size: 22px;
    }
    .content {
      padding: 20px 30px;
      color: #333333;
      line-height: 1.6;
    }
    .btn {
      display: inline-block;
      background-color: #4f46e5;
      color: #fff;
      padding: 10px 20px;
      border-radius: 6px;
      text-decoration: none;
      margin-top: 15px;
    }
    .footer {
      text-align: center;
      font-size: 13px;
      color: #777;
      padding: 15px 10px;
      border-top: 1px solid #eee;
      background-color: #fafafa;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Welcome to Datta’s App 🚀</h2>
    </div>
    <div class="content">
      <p>Hi <b>Dattatray Panchal</b>,</p>
      <p>This is a <b>test email</b> sent using Node.js and a custom HTML template.</p>
      <p>You can style this however you like — add buttons, headings, or anything HTML supports.</p>
      <a href="https://yourwebsite.com" class="btn">Visit Website</a>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Datta’s App. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

sendEmail(
  "dattapanchal085@gmail.com",
  "Test Subject",
  "This is a test email",
  htmlTemplate
);
