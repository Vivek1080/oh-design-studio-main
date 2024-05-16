import { Entry, createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

export type portfolioType = Entry<
  (typeof keystaticConfig)["collections"]["portfolios"]
>;

const reader = createReader(process.cwd(), keystaticConfig);

export default reader;
