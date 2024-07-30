import axios from "axios";
import getEnvVar from "../env";
import { DataRecord } from "../schemas";

export const fetchData = async () =>
  axios.get<DataRecord[]>(getEnvVar("DATA_URL"));
