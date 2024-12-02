# Final-Proyect-Dist
Proyecto final Api de Autos

## Clonar repositorio

git clone https://github.com/LeoHdzR/Final-Proyect-Dist.git

## Contenedor docker

    Ir al directorio y crear los contenedores con:
        docker-compose up -d

# Base de datos Postgre
Si la base de datos no se crea automaticamente, crearla con las siguients variables:
    port:  5432
    host: localhost
    user: admin
    password: toor
    database: cars


# Kubernetes minikube
Driver: Docker

    minikube start;

    hacer los apply a deployment, namespaces, Secrets, Service y volumen, dentro de la carpeta infrastructure;


