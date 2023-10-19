import { Client, Databases } from "appwrite";

const client = new Client();


export const PROJECT_ID = "65302a93da96ed0f1616";
export const DATABASE_ID = "65302cd1d92e3b89b97b";
export const COLLECTION_ID = "65302cec7362ec93156b";

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65302a93da96ed0f1616");




export const database = new Databases(client);
export default client;
