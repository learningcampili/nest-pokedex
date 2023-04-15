<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
```
git clone https://github.com/learningcampili/nest-pokedex.git
```
2. Ejecutar
```
yarn install
```
3. Tener Nest CLi instalado
```
sudo npm i -g @nestjs/cli
```

4. Levatar base de datos
```

docker compose up -d
```
5. clonar el archivo 
```
__.env.template__  y renombrar a __.env__

```

6. Completar las variables de entorno definidas en el
```
.env
```

7. Levatar la aplicacion
```
yarn start:dev
```

8. Recostruir base de datos con la semilla
```
http:///localhost:3000/api/v2/seed
```

## Stack utilizado
  * MondoDb
  * Nest
  
