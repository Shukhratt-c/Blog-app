import nodemailer from 'nodemailer';


export default async (req: any, res: any) => {
  const { name, email, message, phone } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "shukhratt.42@gmail.com", //For example, xyz@gmail.com
            pass: "cqecsfttjvfdmnsq"
        },
        tls: {
            rejectUnauthorized: false
        }
    }); 
  

  try {


    const emailRes = await transporter.sendMail({
      from: email,
      to: 'shukhratt.42@gmail.com',
      subject: `Contact form submission from ${name}`,
      html: `<p>You have a new contact form submission</p><br>
      <p><strong>Name: </strong> ${name} </p><br>
      <p><strong>Email: </strong> ${email} </p><br>
      <p><strong>Phone: </strong> ${phone} </p><br>
      <p><strong>Message: </strong> ${message} </p><br>

      `,
    });
    
    console.log('Messege sent', emailRes.messageId);

  } catch (err) {
    console.log(err)
  }

  res.status(200).json(req.body);
};




