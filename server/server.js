import express from "express";
import dotenv from "dotenv";
import {graphqlHTTP} from "express-graphql";
import schema from "./schema.js";
import cors from "cors";


dotenv.config();
const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.use(cors());

const port = process.env.PORT || 5050;

app.listen(port,()=> {
  console.log(`Server ${port} portunda çalışıyor`)
})
 
