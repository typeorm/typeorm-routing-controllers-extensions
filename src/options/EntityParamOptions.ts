/**
 * Entity transformation options.
 */
export interface EntityParamOptions {

    /**
     * Name of the connection to be used in TypeORM.
     * By default, its "default" connection.
     */
    connection?: string;

    /**
     * Indicate if this parameter's value is required.
     * If its required and client didn't pass a value, routing-controllers will throw an error.
     */
    required?: boolean;

    /**
     * Specifies "parseJson" option to routing-controllers.
     */
    parse?: boolean;

    /**
     * Entity type. Automatically retrieved from entity param's type, but in some cases,
     * for example if you are using array of entities it should be passed explicitly.
     */
    type?: Function;

    /**
     * Property to find by. If not specified, then entity will be fetched by its primary keys.
     */
    property?: string;

}
