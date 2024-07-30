import getEnvVar, { parseSchema } from "./env";
parseSchema();

import Express from "express";
import { executeQueries } from "./libs/queryEngine";
import { fetchData } from "./libs/data";
import logger from "./middlewares/logger";
import { z } from "zod";
import { DataRecord, dataShape } from "./schemas";

const app = Express();
app.use(logger());

let data: DataRecord[] = [];

app.get("/data", (req, res) => {
  const resData = executeQueries(data, req.query);
  res.json(resData);
});

const main = async () => {
  data = dataShape.parse((await fetchData()).data);
  app.listen(getEnvVar("PORT"), () => {
    console.log(`Server running on port ${getEnvVar("PORT")}`);
  });
};

main();
