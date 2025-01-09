import { Sequelize } from "sequelize";
import * as config from "./config/config";

export const sequelize = new Sequelize(config);