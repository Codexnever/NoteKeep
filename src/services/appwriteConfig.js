import { Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)  
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID); 

const databases = new Databases(client);

client.headers = {
  ...client.headers,
  'X-Appwrite-Key': process.env.REACT_APP_APPWRITE_API_KEY, 
};


export { client, databases };
