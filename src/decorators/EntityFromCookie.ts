import {EntityParamOptions} from "../options/EntityParamOptions";
import {defaultMetadataArgsStorage} from "routing-controllers";
import {entityTransform} from "../util/Utils";
import {ParamTypes} from "routing-controllers/metadata/types/ParamTypes";

export function EntityFromCookie(paramName: string, options?: EntityParamOptions) {
    return function(object: Object, methodName: string, index: number) {

        const reflectedType = (<any>Reflect).getMetadata("design:paramtypes", object, methodName)[index];
        const target = options && options.type ? options.type : reflectedType;
        if (!target)
            throw new Error("Cannot guess type if the parameter");

        defaultMetadataArgsStorage().params.push({
            method: methodName,
            name: paramName,
            index: index,
            type: ParamTypes.COOKIE,
            reflectedType: reflectedType,
            parseJson: options && options.parseJson,
            isRequired: options && options.required,
            // format: target,
            target: object.constructor,
            transform: value => entityTransform(value, target, options)
        });
    };
}
