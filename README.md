# form-runner 1.0.19
Form Runner is a library for form management and validation for ***any*** front-end applications. It is designed to be performant, flexible, and easy to use. It leverages [mutation-tracker](https://www.npmjs.com/package/mutation-tracker) library to provide unopinionated interface to implement form management in front-end libraries of your choice, whether its react, vue etc. It also provides a simple API for handling form data, validations, errors, dirty and touched states.

You can use your favorite validation library with form-runner, whether it's Yup, Zod, Joi or any other.

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
  // replace the line below which is always returning no errors with
  // your custom form validation logic or using Yup, Zod etc.
      return Promise.resolve([]);
  };
}
```
#### Example: Validator for *Yup*

Below is the implement validator for Yup. It's pretty simple, isn't it?

```javascript
interface IYupValidationMessage 
  extends IValidationMessage, Record<string, unknown> {
  errorCode: string
}

class YupValidator<T extends Yup.Maybe<Yup.AnyObject>> 
  implements IFormValidator<IYupValidationMessage> {
  
  constructor(private validationSchema: Yup.ObjectSchema<T>) { }

  public validate(data: T): Promise<IYupValidationMessage[]> {
    return this.validationSchema.validate(data, { abortEarly: false })
      .then((_) => [])
      .catch((err) => {
        // Make sure errors returned by Yup Validation Tests are 
        // typed to IYupValidationMessage interface.

        //  Example:
        //  Yup.string().defined()
        //    .test(function (item) {
        //      if (!item) {
        //        return this.createError({
        //        message: {
        //          key: this.path,  message: "Firstname is not provided."
        //        } as Yup.Message<IYupValidationMessage>
        //        });
        //      }
        //    return true;
        //   })
        return err.errors as IYupValidationMessage[];
      });
  }
}
```

### Step 2 - Start using *FormRunner*

In your form, create an instance of FormRunner for your form with passing the validator and the object to validate.
Then track changes in your form by tracking clicks and change events and validate your form when needed.

```javascript
// Create instance of FormRunner
var validator = new YupValidator();
var runner = new FormRunner<typeof user>(validator, user);

// Track form fields state using form events.
runner.setFieldDirty(true, "name.firstname");
runner.setFieldTouched(true, "name.lastname");

// Validate form when needed (may be on click of a button)
runner.validateAsync(user)
.then((response) => {
  // Validation passed or failed?
    console.log("Form Validation: ", isValid ? "passed": "failed");

  console.log("Dirty: ", JSON.stringify(runner.dirty))
  console.log("Touched: ", JSON.stringify(runner.touched))
  console.log("Errors: ", JSON.stringify(runner.errors))
  ...
  ...
});

```

#### Example: Implementation using *Yup*
Below is an implementation of Form validation using Form Runner and Yup validation library.  

```javascript
// Create Yup validation schema
export const userSchema: Yup.ObjectSchema<typeof user> = Yup.object({
    name: Yup.object({
      firstname: Yup.string().defined().test(function(val) { return !val ?
        this.createError({ 
          message: { key: this.path, message: "First name not provided" } as 
            Yup.Message<IYupValidationMessage> })
        : true 
      }),
      lastname: Yup.string().defined().test(function(val) { return !val ?
        this.createError({ 
          message: { key: this.path, message: "Last name not provided" } as 
            Yup.Message<IYupValidationMessage> })
        : true 
      })
    }),
    roles:  Yup.array().defined().of(
      Yup.string().defined().test(function(val) { return !val ?
        this.createError({ 
          message: { key: this.path, message: "Role not provided" } as 
            Yup.Message<IYupValidationMessage> })
        : true 
      })
    ),
    address: Yup.string().defined().test(function(val) { return !val ?
      this.createError({ 
        message: { key: this.path, message: "Address not provided" } as 
            Yup.Message<IYupValidationMessage> })
      : true 
    })
  });

// Create instance of FormRunner
var validator = new YupValidator(userSchema);
var runner = new FormRunner<typeof user>(validator, user);

console.log("User: ", JSON.stringify(user))

// Track form fields state using form events.
runner.setFieldDirty(true, "name.firstname");
runner.setFieldTouched(true, "name.lastname");

// Validate form when needed (may be on click of a submit button)
runner.validateAsync(user)
.then((response) => {
  // Validation passed or failed?
    console.log("Form Validation: ", isValid ? "passed": "failed");

  // Log state of the form
  console.log("Dirty: ", JSON.stringify(runner.dirty))
  console.log("Touched: ", JSON.stringify(runner.touched))
  console.log("Errors: ", JSON.stringify(runner.errors))

  console.log("name.firstname: ", JSON.stringify(runner.dirty.name?.firstname));
  console.log("name.firstname: ", JSON.stringify(runner.touched.name?.firstname));
  console.log("name.firstname: ", JSON.stringify(runner.errors.name?.firstname));

  console.log("name.lastname: ", JSON.stringify(runner.dirty.name?.lastname))
  console.log("name.lastname: ", JSON.stringify(runner.touched.name?.lastname))
  console.log("name.lastname: ", JSON.stringify(runner.errors.name?.lastname));

  console.log("roles[0]: ", JSON.stringify(runner.dirty.roles?.[0]));
  console.log("roles[0]: ", JSON.stringify(runner.touched.roles?.[0]));
  console.log("roles[0]: ", JSON.stringify(runner.errors.roles?.[0]));

  console.log("roles[1]: ", JSON.stringify(runner.dirty.roles?.[1]));
  console.log("roles[1]: ", JSON.stringify(runner.touched.roles?.[1]));
  console.log("roles[1]: ", JSON.stringify(runner.errors.roles?.[1]));

  console.log("name.address: ", JSON.stringify(runner.dirty.address));
  console.log("name.address: ", JSON.stringify(runner.touched.address));
  console.log("name.address: ", JSON.stringify(runner.errors.address));
});

```

### Documentation

coming soon!

