# routing-controllers integration with TypeORM

This extension for TypeORM provides handy decorators that can be used with 
[routing-controllers](https://github.com/pleerock/routing-controllers).

## Installation

* Install module:

`npm install typeorm-routing-controllers-extensions --save`

* Install routing-controllers:

`npm install routing-controllers --save`

* That's all, start using decorators!


## Usage

All decorators can be used on properties and constructor arguments, e.g. you can use both
property and constructor injection.

### @EntityFromParam

Creates entity from the request parameter.

Example:

```typescript
import {JsonController, Get} from "routing-controllers";
import {EntityFromParam} from "typeorm-routing-controllers-extensions";
import {User} from "../entity/User";

@JsonController()
export class UserController {

    @Get("/users/:id")
    get(@EntityFromParam("id") user: User) {
        return user;
    }

}
```

### @EntityFromQuery

Creates entity from the request query parameter.

Example:

```typescript
import {JsonController, Get} from "routing-controllers";
import {EntityFromQuery} from "typeorm-routing-controllers-extensions";
import {User} from "../entity/User";

@JsonController()
export class UserController {

    @Get("/users")
    get(@EntityFromQuery("id") user: User) {
        return user;
    }

}
```

### @EntityFromCookie

Creates entity from the request cookie.

Example:

```typescript
import {JsonController, Get} from "routing-controllers";
import {EntityFromCookie} from "typeorm-routing-controllers-extensions";
import {User} from "../entity/User";

@JsonController()
export class UserController {

    @Get("/users")
    get(@EntityFromCookie("userId") user: User) {
        return user;
    }

}
```

### @EntityFromBody

Creates entity from the request body.

Example:

```typescript
import {JsonController, Post} from "routing-controllers";
import {EntityFromBody} from "typeorm-routing-controllers-extensions";
import {User} from "../entity/User";

@JsonController()
export class UserController {

    @Post("/users")
    save(@EntityFromBody() user: User) {
        return this.userRepository.persist(user);
    }

}
```

### @EntityFromBodyParam

Creates entity from the request's body parameter.

Example:

```typescript
import {JsonController, Post} from "routing-controllers";
import {EntityFromBodyParam} from "typeorm-routing-controllers-extensions";
import {User} from "../entity/User";

@JsonController()
export class UserController {

    @Post("/users")
    save(@EntityFromBodyParam("user") user: User) {
        return this.userRepository.persist(user);
    }

}
```

### Decorators Options

Each decorator accepts `EntityParamOptions` which has following options:

* `connection?: string`

Name of the connection to be used in TypeORM. By default, its "default" connection.

* `required: boolean`

Indicate if this parameter's value is required.
If its required and client didn't pass a value, routing-controllers will throw an error.

* `parse: boolean`

Specifies "parseJson" option to routing-controllers.

* `type: Function`

Entity type. Automatically retrieved from entity param's type, but in some cases,
for example if you are using array of entities it should be passed explicitly.

* `property: boolean`

Property to find by. If not specified, then entity will be fetched by its primary keys.

## Samples

Take a look on samples in [./sample](sample) for examples of usages.
