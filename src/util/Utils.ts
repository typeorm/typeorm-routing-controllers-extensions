import {EntityParamOptions} from "../options/EntityParamOptions";
import {getConnectionManager} from "typeorm";

/**
 * @internal
 */
export function entityTransform(value: any, target: any, options?: EntityParamOptions) {
    const connection = getConnectionManager().get(options ? options.connectionName : undefined);
    const repository = connection.getRepository(target);
    if (options) {
        if (options.many) {
            if (!options.property)
                throw new Error("Conditional property must be set to perform a query to multiple objects.");

            return repository.find({ [options.property]: value });

        } else if (options.property) {
            return repository.findOne({ [options.property]: value });
        }
    }
    return repository.findOneById(value);
}
