import type {Rule} from "$lib/utils/form/rules/rule";
import type {Field} from "$lib/utils/form/field";

export class IsLongEnoughRule implements Rule {
    public constructor(
        public params = { minLength: 4 },
        public message = ' needs to be at least 4 characters long!'
    ) {}

    validate(field: Field): boolean | string {
        if (typeof field.value !== 'string') {
            return true
        }

        if (field.value.trim().length < this.params.minLength) {
            return field.name + this.message;
        }

        return true;
    }

}