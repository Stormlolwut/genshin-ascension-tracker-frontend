import type {Field} from "$lib/utils/form/field";

export interface Rule {
    params?: any
    message: string
    validate(field : Field): boolean | string
}