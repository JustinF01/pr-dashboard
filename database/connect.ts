import { MongoClient } from "mongodb";
const connectionString = "mongodb+srv://justin:testing123@cluster0.3mgul.mongodb.net/pull_requests?retryWrites=true&w=majority";
export const client = new MongoClient(connectionString);