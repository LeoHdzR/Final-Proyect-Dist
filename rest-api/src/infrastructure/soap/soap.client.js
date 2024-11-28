import soap from "soap";
import { SOAP_URL } from "../../config/config.js";

export const getSoapClient = async () => {
  return new Promise((resolve, reject) => {
    soap.createClient(SOAP_URL, (err, client) => {
      if (err) {
        return reject(err);
      }
      resolve(client);
    });
  });
};
