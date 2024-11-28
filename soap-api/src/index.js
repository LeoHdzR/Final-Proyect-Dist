import express from "express";
import soap from "soap";
import { carService, carWsdl } from "./soap/car.soap.js";
import { PORT } from "./config/config.js";

const app = express();
app.use(express.json());

// Endpoint para exponer el servicio SOAP
app.listen(PORT, () => {
  console.log(`SOAP API running on http://localhost:${PORT}`);
  const wsdlPath = "/soap";
  soap.listen(app, wsdlPath, carService, carWsdl);
  console.log(`WSDL available at http://localhost:${PORT}${wsdlPath}?wsdl`);
});
