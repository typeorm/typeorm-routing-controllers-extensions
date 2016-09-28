import {EntityParamOptions} from "../options/EntityParamOptions";
import {defaultMetadataArgsStorage} from "routing-controllers";
import {getConnectionManager} from "typeorm";
import {plainToClass} from "class-transformer";
import {ParamTypes} from "routing-controllers/metadata/types/ParamTypes";
import {EntityMetadataCollection} from "typeorm/metadata-args/collection/EntityMetadataCollection";

/**
 * Creates entity from the request body.
 */
export function EntityFromBody(options?: EntityParamOptions) {
    return function(object: Object, methodName: string, index: number) {

        const reflectedType = (Reflect as any).getMetadata("design:paramtypes", object, methodName)[index];
        const target = options && options.type ? options.type : reflectedType;
        if (!target)
            throw new Error("Cannot guess type if the parameter");

        defaultMetadataArgsStorage().params.push({
            method: methodName,
            index: index,
            type: ParamTypes.BODY,
            reflectedType: reflectedType,
            parseJson: options && options.parseJson,
            isRequired: options && options.required,
            // format: target,
            target: object.constructor,
            transform: (value: any) => {

                const connection = getConnectionManager().get(options ? options.connectionName : undefined);

                function buildMap(target: Function, maps: { target: Function, properties: any }[]) {
                    if (!!maps.find(map => map.target === target))
                        return maps;

                    const map: any = { target: target, properties: {} };
                    maps.push(map);
                    const entityMetadatas: EntityMetadataCollection = (connection as any).entityMetadatas;
                    entityMetadatas.findByTarget(target)
                        .relations
                        .forEach(relation => {
                            if (relation.type instanceof Function) {
                                map.properties[relation.propertyName] = relation.type;
                                buildMap(relation.type, maps);
                            }
                        });
                    return maps;

                }

                const maps = buildMap(target, []);
                if (options && options.many) {
                    return plainToClass(target, value as Object[], { targetMaps: maps });
                }
                return plainToClass(target, value, { targetMaps: maps });
            }
        });
    };
}