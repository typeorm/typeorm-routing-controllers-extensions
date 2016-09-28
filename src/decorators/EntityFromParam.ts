import {EntityParamOptions} from "../options/EntityParamOptions";
import {defaultMetadataArgsStorage} from "routing-controllers";
import {entityTransform} from "../util/Utils";
import {ParamTypes} from "routing-controllers/metadata/types/ParamTypes";

export function EntityFromParam(paramName: string, options?: EntityParamOptions) {
    return function(object: Object, methodName: string, index: number) {

        const reflectedType = (Reflect as any).getMetadata("design:paramtypes", object, methodName)[index];
        const target = options && options.type ? options.type : reflectedType;
        if (!target)
            throw new Error("Cannot guess type if the parameter");

        defaultMetadataArgsStorage().params.push({
            method: methodName,
            name: paramName,
            index: index,
            type: ParamTypes.PARAM,
            reflectedType: reflectedType,
            parseJson: options && options.parseJson,
            isRequired: options && options.required,
            target: object.constructor,
            transform: value => entityTransform(value, target, options)
        });
    };
}