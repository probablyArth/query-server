import getEnvVar, { parseSchema } from "./env";
parseSchema();

import Express from "express";
import { executeQueries } from "./libs/queryEngine";
import { fetchData } from "./libs/data";
import logger from "./middlewares/logger";

const app = Express();
app.use(logger());

let data: Record<string, string | number>[] = [];

app.get("/", (req, res) => {
  const resData = executeQueries(data, req.query);
  res.json(resData);
});

const main = async () => {
  data = (await fetchData()).data;
  app.listen(getEnvVar("PORT"), () => {
    console.log(`Server running on port ${getEnvVar("PORT")}`);
  });
};

main();
