import "reflect-metadata";
import {createConnection, useContainer} from "typeorm";
import {Container} from "typedi";
import {createExpressServer} from "routing-controllers";
import {PostController} from "./controller/PostController";

useContainer(Container);
createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    entities: [__dirname + "/entity/*.js"],
    synchronize: true,
    logging: true
}).then(async connection => {

    console.log("Connected. Now run express app");
    createExpressServer({
        controllers: [PostController]
    }).listen(3000);
    console.log("Server is up and running on port 3000. Now send requests to check if everything works.");

}).catch(error => console.log("Error: ", error));