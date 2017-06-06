import {EntityParamOptions} from "../options/EntityParamOptions";
import {getConnection} from "typeorm";
import {plainToClass} from "class-transformer";
import {Action, getMetadataArgsStorage} from "routing-controllers";

/**
 * Creates entity from the request body.
 */
export function EntityFromBody(options?: EntityParamOptions) {
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
            type: "body",
            parse: options && options.parse,
            required: options && options.required,
            transform: (action: Action, value: any) => {
                const connection = getConnection(options ? options.connection : undefined);

                function buildMap(target: Function, maps: { target: Function, properties: any }[]) {
                    if (!!maps.find(map => map.target === target))
                        return maps;

                    const map: any = { target: target, properties: {} };
                    maps.push(map);
                    connection.getMetadata(target).relations.forEach(relation => {
                        if (relation.type instanceof Function) {
                            map.properties[relation.propertyName] = relation.type;
                            buildMap(relation.type, maps);
                        }
                    });
                    return maps;

                }

                const maps = buildMap(target, []);
                if (isArray)
                    return plainToClass(target, value as Object[], { targetMaps: maps });

                return plainToClass(target, value, { targetMaps: maps });
            }
        });
    };
}