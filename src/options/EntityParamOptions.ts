/**
 * Entity transformation options.
 */
export interface EntityParamOptions {

    /**
     * Name of the connection to be used in TypeORM.
     * By default, its "default" connection.
     */
    connectionName?: string;

    /**
     * Indicate if this parameter's value is required.
     * If its required and client didn't pass a value, routing-controllers will throw an error.
     */
    required?: boolean;

    /**
     * Specifies "parseJson" option to routing-controllers.
     */
    parseJson?: boolean;

    /**
     * Entity type. Automatically retrieved from entity param's type, but in some cases,
     * for example if you are using array of entities it should be passed explicitly.
     */
    type?: Function;

    /**
     * Indicates if it should transform to an array of entities.
     * To make it work you need to specify many: true + specify type of entity
     */
    many?: boolean;

    /**
     * Property to find by. If not specified, then entity will be fetched by its primary keys.
     */
    property?: string;

}
