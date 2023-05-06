import type {Rule} from "$lib/utils/form/rules/rule";
import type {Field} from "$lib/utils/form/field";

export class IsEmptyRule implements Rule {

    constructor(public message = ' Cannot be empty!') {}

    public validate(field: Field): boolean | string {
        if (field.value === null) {
            return field.name + this.message;
        }
        if (typeof field.value === 'string') {
            if (field.value.length < 1) {
                return field.name + this.message;
            }
            if (field.value.trim() === '') {
                return field.name + this.message;
            }
        }
        return true;
    }
}