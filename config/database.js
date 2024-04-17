import { MongoClient } from "mongodb";

const DATABASE = "project-cuoi-khoa";

const db = {};

const connectToDatabase = async () => {
  try {
    const mongoClient = new MongoClient(process.env.MONGO_URI);
    await mongoClient.connect();

    console.log("Database connected successfully");
    const database = mongoClient.db(DATABASE);

    // Collections
    db.users = database.collection("users");
    db.dishes = database.collection("dish");
    db.typeMenu = database.collection("typeMenu");
    db.dishGroup = database.collection("dishGroup");
    
    // Add the "order" collection
    db.order = database.collection("order");
  } catch (error) {
    console.error("Connect to DB failed:", error);
    process.exit(1);
  }
};

export { connectToDatabase, db };
