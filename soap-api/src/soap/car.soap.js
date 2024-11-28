import { createCar, getCarById } from '../services/car.service.js';

// Definir las operaciones disponibles en el servicio SOAP
const carService = {
  CarService: {
    CarPort: {
      // Método para crear un coche
      createCar: async function (args) {
        try {
          const { name, brand, model, price } = args.car || {};
          if (!name || !brand || isNaN(model) || isNaN(price)) {
            throw new Error('Invalid car data');
          }
          const newCar = await createCar({ name, brand, model, price });
          return { success: true, car: newCar };
        } catch (error) {
          console.error(error);
          throw new Error('Error creating car');
        }
      },

      // Método para obtener un coche por ID
      getCarById: async function (args) {
        try {
          const { id } = args;
          if (isNaN(id)) {
            throw new Error('Invalid ID');
          }
          const car = await getCarById(parseInt(id));
          return { car };
        } catch (error) {
          console.error(error);
          throw new Error('Error fetching car by ID');
        }
      },
    },
  },
};

// WSDL que describe el servicio SOAP
const carWsdl = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
             xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"
             xmlns:xsd="http://www.w3.org/2001/XMLSchema"
             targetNamespace="http://localhost:5001/">
  <message name="createCarRequest">
    <part name="car" type="xsd:string"/>
  </message>
  <message name="createCarResponse">
    <part name="success" type="xsd:boolean"/>
    <part name="car" type="xsd:string"/>
  </message>

  <message name="getCarByIdRequest">
    <part name="id" type="xsd:int"/>
  </message>
  <message name="getCarByIdResponse">
    <part name="car" type="xsd:string"/>
  </message>

  <portType name="CarPortType">
    <operation name="createCar">
      <input message="tns:createCarRequest"/>
      <output message="tns:createCarResponse"/>
    </operation>
    <operation name="getCarById">
      <input message="tns:getCarByIdRequest"/>
      <output message="tns:getCarByIdResponse"/>
    </operation>
  </portType>

  <binding name="CarBinding" type="tns:CarPortType">
    <soap:binding style="rpc" transport="http://schemas.xmlsoap.org/soap/http"/>
    <operation name="createCar">
      <soap:operation soapAction="urn:createCar"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="getCarById">
      <soap:operation soapAction="urn:getCarById"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
  </binding>

  <service name="CarService">
    <port name="CarPort" binding="tns:CarBinding">
      <soap:address location="http://localhost:5001/soap"/>
    </port>
  </service>
</definitions>`;

export { carService, carWsdl };
