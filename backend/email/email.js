const nodemailer=require('nodemailer');
async function sendEmail(email='thakurabhinav17122001@gmail.com',message,name,subject){
    return new Promise(async(resolve,reject)=>{
        try{
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAILPASSWORD
                }
            })
            let mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: `${subject}`,
                html:`
                <!DOCTYPE html>
                <html lang="en">
                    <body>
                        <p>Hii ${name}</p>
                        <p>
                            ${message}
                        </p>
                        <p>Team Shopp</p>
                    </body>
                </html>`
            }
            let info = await transporter.sendMail(mailOptions);
            resolve(`Mail sent Successfully to ${info.messageId}`)
            console.log(`Message sent to ${info.messageId}`);
        }catch(e){
            console.log(`Email could not be sent ${e}`)
            reject('Error occured while sending mail')
        }
    })
}

module.exports=sendEmail