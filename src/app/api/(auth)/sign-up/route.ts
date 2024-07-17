import connectDB from "@/lib/connectdb";
import usermodel from "@/models/userModel";
import bcrypt from "bcrypt";
import sendVerificationMail from "@/helper/sendmail";
export const POST = async (request: Request) => {
  await connectDB();

  try {
    const { username, email, password } = await request.json();

    const ExistingUser = await usermodel.findOne({
      email,
      isVerified: true,
    });
    if (ExistingUser) {
      return Response.json(
        {
          success: false,
          message: "user already exist",
        },
        { status: 400 }
      );
    }
    const ExistingUserUnVerified = await usermodel.findOne({
      email,
      isVerified: false,
    });
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (ExistingUserUnVerified) {
      ExistingUserUnVerified.password = await bcrypt.hash(password, 10);
      ExistingUserUnVerified.verifyCode = verifyCode;
      ExistingUserUnVerified.verifyCodeExpiry = new Date(Date.now() + 3600000);
      await ExistingUserUnVerified.save();
    } else {
      const HashedPassword = await bcrypt.hash(password, 10);
      const verifyCodeExpiry = new Date(Date.now() + 3600000);
      const newUser = new usermodel({
        username,
        password: HashedPassword,
        email,
        verifyCode: verifyCode,
        verifyCodeExpiry: verifyCodeExpiry,
        isVerified: false,
      });
      await newUser.save();
      //email verification system
      const emailResponse = await sendVerificationMail(
        username,
        email,
        verifyCode
      );
      if (!emailResponse.success) {
        return Response.json(
          {
            success: false,
            message: emailResponse.message,
          },
          { status: 500 }
        );
      }
    }
    return Response.json(
      {
        success: true,
        message:
          "User registered successfully ,please verify your account first",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error registering user");

    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
};
