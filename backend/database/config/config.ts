import { config as custom_config } from "../../config/environment";
import { Options } from "sequelize";

const config: Options = {
  username: custom_config.DB_USER,
  password: custom_config.DB_PASSWORD,
  database: custom_config.DB_NAME,
  host: custom_config.DB_HOST,
  dialect: 'mysql',
};

export = config;