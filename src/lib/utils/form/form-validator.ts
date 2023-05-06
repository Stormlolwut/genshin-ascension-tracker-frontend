import type {Rule} from "$lib/utils/form/rules/rule";
import type {Field} from "$lib/utils/form/field";

/*
  TODO: Make validations apply only on certain field names
  So that we can check if the password is 4 characters long while the username is 3 characters long
 */
export class FormValidator {
    private rules: Array<Rule> = [];

    public addRule(rule: Rule) {
        this.rules.push(rule);
        return this;
    }

    public validate(fields: Array<Field>) {
        for (const rule of this.rules) {
            for (const field of fields) {
                const result = rule.validate(field);
                if (typeof result === 'string') {
                    return result;
                }
            }
        }
        return true;
    }
}