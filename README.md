# Form Runner 1.0
Form Runner is an unopinionated *Form Validation* library for front-end of your choice.
Form Runner can connect with any validation library of your choice such as [Yup](https://github.com/jquense/yup), [Zod](https://github.com/colinhacks/zod), [Joi](https://github.com/hapijs/joi) etc.

In fact there already plugins available to use the above three validation libraries with Form Runner.

# Validation plugins for Form Runner
Following validation plugins are already available to use with form-runner:

- [form-runner-yup-plugin](https://github.com/callmeyaz/form-runner-yup-plugin)
- [form-runner-zod-plugin](https://github.com//callmeyaz/form-runner-zod-plugin)
- [form-runner-joi-plugin](https://github.com/callmeyaz/form-runner-joi-plugin)

# Why Form Runner?
Other than Fom Runner, all Form Validation libraries are platform dependent or strongly tied with their specific front-end libraries.

Form Runner is the first Form validation library of it's kind that provides platform independence.

We can use Form Runner with React, Vue or even Vanilla Javascript without additional overhead.

[react-form-runner](https://github.com/callmeyaz/react-form-runner) is specialized implementation of Form Runner for React.

# Usage

Consider the HTML below:

In a browser:

```browser
<input type="text" id="firstname" />
<input type="text" id="lastname" />
<textarea id="address"></textarea>
```

### Step 1 - Plug your favorite validation library in to form-runner
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
}

export class YupValidator<T extends Yup.Maybe<Yup.AnyObject>> 
  implements IFormValidator<IYupValidationMessage> {
  
  constructor(private validationSchema: Yup.Schema<T>) { }

  public validate(data: T): Promise<IYupValidationMessage[]> {
    return this.validationSchema.validate(data, { abortEarly: false })
      .then((_) => [])
      .catch((err) => {
        if (err instanceof Yup.ValidationError) {
          var errors = err.inner;
          if (Array.isArray(errors)) {
            return errors.map((item) => {
              return {
                key: item.path,
                message: item.message
              } as IYupValidationMessage;
            });
          }
        }
        throw err;
      });
  }
}
```

### Step 2 - Start using *Form-Runner*

After Step 1 you are all set to use the form-runner in your application forms.
Track changes in your form through javascript *onclick*, *onblur* and *onchange* events and validate your html forms when needed.

#### Example: Implementation using *Yup*
Below is an implementation of Form validation using Form Runner and Yup validator mentioned above.

The JSON object below represents the form state of a HTML form above:

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

The Yup validation schema for above JSON can be:

```javascript

// Create Yup validation schema

const userSchema: Yup.Schema = Yup.object({
    name: Yup.object({
        firstname: Yup.string().required("First name not provided"),
        lastname: Yup.string().required("Last name is not provided")
    }),
    address: Yup.string().required("Address not provided")
});

```

Finally, below is how we can track the changes in the form.

```javascript

// Track form fields state using form events.

runner.setFieldDirty(true, "name.firstname");
runner.setFieldTouched(true, "name.lastname");

// Validate form when needed (may be on click of a submit button)
runner.validateAsync(user)
.then((response) => {
  var isValid = response;

  // Validation passed or failed?
    console.log("Form Validation: ", response ? "passed": "failed");

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

