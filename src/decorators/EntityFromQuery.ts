import {EntityParamOptions} from "../options/EntityParamOptions";
import {entityTransform} from "../util/Utils";
import {getMetadataArgsStorage} from "routing-controllers";

export function EntityFromQuery(paramName: string, options?: EntityParamOptions) {
    return function(object: Object, methodName: string, index: number) {

        const reflectedType = (Reflect as any).getMetadata("design:paramtypes", object, methodName)[index];
        const isArray = reflectedType && reflectedType.name ? reflectedType.name.toLowerCase() === "array" : false;
        const target = options && options.type ? options.type : reflectedType;
        if (!target)
            throw new Error("Cannot guess type if the parameter");

        getMetadataArgsStorage().params.push({
            object: object,
            method: methodName,
            name: paramName,
            index: index,
            type: "query",
            parse: options && options.parse,
            required: options && options.required,
            transform: (actionProperties, value) => entityTransform(value, target, isArray, options)
        });
    };
}
