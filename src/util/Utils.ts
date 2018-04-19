import {EntityParamOptions} from "../options/EntityParamOptions";
import {getConnectionManager} from "typeorm";

/**
 * @internal
 */
export function entityTransform(value: any, target: any, isArray: boolean, options?: EntityParamOptions) {
    if (value === null || value === undefined)
        return Promise.resolve(value);

    const connection = getConnectionManager().get(options ? options.connection : undefined);
    const repository = connection.getRepository(target);
    if (options) {
        if (isArray) {
            if (!options.property)
                throw new Error("Conditional property must be set to perform a query to multiple objects.");

            return repository.find({ [options.property]: value });

        } else if (options.property) {
            return repository.findOne({ [options.property]: value });
        }
    }
    return repository.findOne(value);
}
