import mongoose from "mongoose";
type connectionObject = {
  isconnected?: number;
};
const connection: connectionObject = {};
async function connectDB() {
  if (connection.isconnected) {
    console.log("Already connected to database ");
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "", {});
    connection.isconnected = db.connections[0].readyState;
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("failed to connect database", error);
    process.exit(1);
  }
}
export default connectDB;
