## Nestjs Task Management API

> init new project 

````shell
$ nest new project-name
$ cd project-name
$ yarn start:dev
````

> ✔ generate new module.

````shell
$ nest g module tasks
# CREATE /src/tasks/tasks.module.ts (82 bytes)
# UPDATE /src/app.module.ts (159 bytes)
````

> ✔ generate new controller

````shell
$ nest g controller tasks --no-spec
# CREATE /src/tasks/tasks.controller.ts (99 bytes)
# UPDATE /src/tasks/tasks.module.ts (170 bytes)
````

> ✔ generete new service.

````shell
$ nest g service tasks --no-spec
CREATE /src/tasks/tasks.service.ts (89 bytes)
UPDATE /src/tasks/tasks.module.ts (258 bytes)
````

> ✔ Add class validators and transform

````shell
$ yarn add class-validator class-transformer
````

> ✔ Add typeorm for Mongodb

````shell
$ yarn add @nestjs/typeorm typeorm mongodb
````

> ✔ Starting/Stoping Mongodb

````shell
$ brew services list | grep mongodb
$ brew services start mongodb
$ brew services stop mongodb
````

> ✔ Initialize with env variables

````shell
$ PORT=3005 yarn start:dev
````

> ✔

````shell
$ 
````