# form-runner 1.0.6
Form Runner is a library for form management and validation for ***any*** front-end applications. It is designed to be performant, flexible, and easy to use. It leverages [mutation-tracker](https://www.npmjs.com/package/mutation-tracker) library to provide unopinionated interface to implement form management in front-end libraries of your choice, whether its react, vue etc. It also provides a simple API for handling form data, validations, errors, dirty and touched states.

You can use your favorite or any other validation library with form-runner, whether it's Yup, Zod, Joi or any other.

### How to Use?

Consider the HTML below:

In a browser:
```browser
<input type="text" id="firstname" />
<input type="text" id="lastname" />
<textarea id="address"></textarea>
```
The JSON object below represents the state of a HTML form above:
```javascript
var user = {
	name: {
		firstname: "John",
		lastname: "Doe"
	},
    roles: [
        "contributor",
        "administrator"
    ],
	address: "123 Main Street"
}
```

### Step 1 - Plug your favorite validation library to form-runner
Plugging in an validation library is very straight forward. Just provide implementation of two interfaces *IValidationMessage* and *IFormValidator* and you are done:

```javascript
// Provide implementation for validation message interface.
export interface IMyValidationMessage implements IValidationMessage {
    key: string;
    message: string;
}

// Provide implementation of validator interface.
export class CustomValidator implements IFormValidator<MyValidationMessage> {
    public validate(data: any): Promise<MyValidationMessage[]> {
		// Below we are always returning no errors which means there are no errors.
        return Promise.resolve([]);
    };
}
```
#### Validator for *Yup*

Below is the implement validator for Yup. Prety simple isn't it?

```javascript
interface IYupValidationErrorMessage extends IValidationMessage, Record<string, unknown> {
    errorCode: string
}

class YupValidator<T extends Yup.Maybe<Yup.AnyObject>> implements IFormValidator<IYupValidationErrorMessage> {
    constructor(private validationSchema: Yup.ObjectSchema<T>) { }

	public validate(data: T): Promise<IYupValidationErrorMessage[]> {
        return this.validationSchema.validate(data, { abortEarly: false })
            .then((_) => [])
            .catch((err) => {
				// Make sure errors returned by Yup Validation Tests are typed to IYupValidationErrorMessage interface
				//	Example:
				//	Yup.string().defined()
				//		  .test(function (item) {
				//			if (!item) {
				//			  return this.createError({
				//				message: {
				//					key: this.path,  message: "Firstname is not provided."
				//				} as Yup.Message<IYupValidationErrorMessage>
				//			  });
				//			}
				//			return true;
				//		  })
                return err.errors as IYupValidationErrorMessage[];
            });
    }
}
```