import "reflect-metadata";
import {createConnection, useContainer} from "typeorm";
import {Container} from "typedi";
import {createExpressServer} from "routing-controllers";

useContainer(Container);
createConnection({
    driver: {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "test",
        password: "admin",
        database: "test"
    },
    entities: [
        __dirname + "/entity/*.js"
    ],
    autoSchemaSync: true
}).then(async connection => {

    console.log("Connected. Now run express app");
    createExpressServer().listen(3000);
    console.log("Server is up and running on port 3000. Now send requests to check if everything works.");

}).catch(error => console.log("Error: ", error));