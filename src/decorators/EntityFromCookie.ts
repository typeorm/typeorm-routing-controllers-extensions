import {EntityParamOptions} from "../options/EntityParamOptions";
import {entityTransform} from "../util/Utils";
import {getMetadataArgsStorage} from "routing-controllers";

export function EntityFromCookie(paramName: string, options?: EntityParamOptions) {
    return function(object: Object, method: string, index: number) {

        const reflectedType = (Reflect as any).getMetadata("design:paramtypes", object, method)[index];
        const isArray = reflectedType && reflectedType.name ? reflectedType.name.toLowerCase() === "array" : false;
        const target = options && options.type ? options.type : reflectedType;
        if (!target)
            throw new Error("Cannot guess type if the parameter");

        getMetadataArgsStorage().params.push({
            object: object,
            method: method,
            index: index,
            name: paramName,
            type: "cookie",
            parse: options && options.parse,
            required: options && options.required,
            transform: (actionProperties, value) => entityTransform(value, target, isArray, options)
        });
    };
}
