## Descripción

El framework base de este bloque es [Nest](https://github.com/nestjs/nest); este nos brinda grandes cualidades, por ejemplo: inyección de dependencias, controladores http, manejo de excepciones, división del código por módulos, integración con diferentes tecnologías de persistencia, etc.

## Los principales patrones y estilos de arquitectura que guían este bloque son

#### Arquitectura hexagonal

Arquitectura que fomenta que nuestro dominio sea el núcleo de todas las capas, también conocida como puertos y adaptadores en la cual el dominio define los puertos y en las capas superiores se definen los adaptadores para desacoplar el dominio. Se divide principalmente en tres capas, **aplicación**, **dominio** e **infraestructura**

- **Infraestructura**: Capa que tiene las responsabilidades de realizar los adaptadores a los puertos definidos en el domino, exponer web services, consumir web services, realizar conexiones a bases de datos, ejecutar sentencias DML, en general todo lo que sea implementaciones de cualquier framework
- **Aplicación**: capa encargada de enrutar los eventos entrantes de la capa de infraestructura hacía la capa del dominio, generalmente se conoce como una barrera transaccional la cual agrupa toda la invocación de un caso de uso, se pueden encontrar patrones como Fabricas, Manejadores de Comandos, Bus de eventos, etc
- **Dominio**: representa toda la lógica de negocio de la aplicación la cual es la razón de existir del negocio. Se busca evitar el anti-patron [https://martinfowler.com/bliki/AnemicDomainModel.html](https://martinfowler.com/bliki/AnemicDomainModel.html) y favorecer el principio [https://martinfowler.com/bliki/TellDontAsk.html](https://martinfowler.com/bliki/TellDontAsk.html) en esta capa se pueden encontrar los siguientes patrones agregados, servicios de dominio, entidades, objetos de valor, repositorios (puerto), etc.

Para obtener mas documentación sobre este tipo de arquitectura se recomienda [https://codely.tv/blog/screencasts/arquitectura-hexagonal-ddd/](https://codely.tv/blog/screencasts/arquitectura-hexagonal-ddd/)

#### Patrón CQRS:

Patrón con el cual dividimos nuestro modelo de objetos en dos, un modelo para consulta y un modelo para comando (modificación de datos). Este patrón es recomendado cuando se va desarrollar lógica de negocio compleja porque nos ayuda a separar las responsabilidades y a mantener un modelo de negocio consistente.

- **Consulta**: modelo a través del cual se divide la responsabilidad para presentar datos en la interfaz de usuario, los objetos se modelan basado en lo que se va a presentar y no en la lógica de negocio, ejm: ver facturas, consultar clientes
- **Comando**: son todas las operaciones que cambian el estado del sistema, ejm: (facturar, aplicar descuento), este modelo se construye todo el modelo de objetos basado en la lógica de negocio de la aplicación

Para mayor documentación del patrón [https://martinfowler.com/bliki/CQRS.html](https://martinfowler.com/bliki/CQRS.html)

#### Especificaciones técnicas:

- Framework usado NestJS
- El código se encuentra agrupado por el patrón [agregado](https://martinfowler.com/bliki/DDD_Aggregate.html) los cuales se convierten en [módulos nestjs](https://docs.nestjs.com/modules) agrupados en la capa de infraestructura
- Uso de TypeOrm para el acceso a datos, en el archivo **ormconfig.json** se encuentran los datos de conexión a la bd
- Uso de [Jest](https://docs.nestjs.com/fundamentals/testing#testing) para las pruebas automatizadas
- Uso de [Sinon.JS](https://sinonjs.org/releases/v9.0.2/) para facilitar la creación de sandboxes, stubs, mocks y spies.
- Ejemplo de pruebas automatizadas con Jmeter
- Contiene los plugin de lint y prettier, se recomienda ejecutarlos antes de subir código al repositorio o agregarlos como un hook.
- Contiene la configuración para jenkins y sonar con análisis de cobertura y deuda técnica.
- Soporte para swagger, para verificarlo se debe ingresar a la url http://localhost:3000/api/

#### Uso de migraciones

El bloque hace uso de [TypeORM](https://typeorm.io/#/), este provee funciones para generar migraciones vacías (en las cuales escribimos el SQL que deseamos sea ejecutado contra la base de datos), migraciones generadas desde el código (en el cual el ORM lee nuestro código y escribe la migración por nosotros); además de correr nuestras migraciones y revertir las mismas.

**Nota**: El uso de esta característica requiere de una versión de NPM 5.2.0 o superior, ya que hace uso de NPX.

- `$ npx typeorm migration:create -n NombreMigracion`: Crea un archivo con dos métodos up y down, en los cuales podemos hacer uso de `QueryRunner` para crear el script SQL que necesitamos ejecutar.
- `$ npx typeorm migration:generate -n NombreMigracion`: Genera una migración con base a nuestras entidades.
- `$ npx typeorm migration:run`: Ejecuta nuestras migraciones. Es importante haber compilado nuestro TypeScript a JavaScript antes de correr el comando, ya que no funciona sobre archivos `.ts`, con solo iniciar el servidor mediante `$ npm start` basta.
- `$ npx typeorm migration:revert`: Ejecuta la función `down` de la última migración ejecutada.

## Instalación

```bash
$ npm install
```

## Arrancar la aplicación

```bash
# desarrollo
$ npm run start

# modo desarrollo-vigilante (Reinicia el servidor cuando detecta cambios)
$ npm run start:dev

# modo producción
$ npm run build & npm run start:prod
```

## Pruebas

```bash
# pruebas unitarias
$ npm run test:unit

# pruebas de integración
$ npm run test:e2e

# todas las pruebas
$ npm run test

# todas las pruebas con cobertura
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
