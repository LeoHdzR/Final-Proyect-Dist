export const PORT = process.env.PORT || 4000;
export const DB_CONFIG = {
  user: process.env.DB_USER || "admin",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "postgres",
  password: process.env.DB_PASSWORD || "toor",
  port: process.env.DB_PORT || 5432,
};
export const SOAP_URL = process.env.SOAP_URL || "http://localhost:5001/soap?wsdl";
