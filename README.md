# carbon-validate
The `carbon-validate` module provides Zend-like set of commonly used data validators. This means you can check your data with  a set of validators after you've received user's input or before you insert data into your database. You can use it as a stand-alone module or most commonly with `carbon-form` module which validates form data automatically for you.

If you've ever worked with any `Zend_Validate` validators from the Zend Framework you will be familiar with it's sintax and if you haven't then scroll down to the "Usage" section and you'll be up-and-running in no time.


## Installation
```
npm install carbon-validate [--save]
```

## Usage
The `carbon-validate` module packs some of the most used validators which share the same interface. Each validator provides public access to the function `isValid` which does the actual validation check and then calls the callback function letting you know whether input data was successfully validated or not. Some validators have options so that you can customize it to your needs.

The function `isValid` has the following prototype `Validate.prototype.isValid = function(value, context, callback)` and it is common to all validators. It has 3 parameters:
* `value` - Input value that is being passed for the validation.
* `context` - Context in which input value exists (used by `carbon-form` when needed).
* `callback` - The callback function which is called after the validation check has been completed.

#### Stand-alone
```js
var Validate = require("carbon-validate");

var between = new Validate.Between({
    min: 5,
    max: 25
});

var inputValue = "...";

between.isValid(inputValue, {}, function(err, value) {
    if (err)
        console.log(err); // By default it outputs: "'...' is not between '5' and '25'"
    else
        console.log("Input value is between 5 and 25");
});

```

#### With `carbon-form`
```js
var Form = require("carbon-form");
var Validate = require("carbon-validate");

var form = new Form();

form.addElements([
    new Form.Element.Text("email_address", {
        label: "Email address",
        validators: [
            new Validate.NotEmpty({
                messages: {
                    "is_empty": "Please type in your email address" 
                }
            }),
            new Validate.EmailAddress()
        ]
    });
]);
```

This way when the form is rendered to the user it will automatically display error messages for each element whose validators haven't passed the validation check.

## Validators
#### Between
Checks if the input value is between two integer values.

**Options**
* `inclusive` [`Boolean`] - Defines whether `min` and `max` values represent minimal and maximal values allowed, respectively.
* `min` [`Integer`] - Minimum value.
* `max` [`Integer`] - Maximum value.
* `messages`
 * `not_between` - Message which is returned if the input value isn't between `min` and `max` values.

#### Callback
If you don't want to make your own validator but you still need to do some custom validation check then this validator is for you.

**Options**
* `callback` [`Function`] - A function that receives two arguments: the value and validator options and which returns either `true` or `false` depending whether you've successfully validated input data.

#### DbNoRecordExists
Checks if the value already exists in the database. This means that the validation check will fail if there is already a matching record in the database. Typical example is when you want to check if username is already taken or if email address is already registered in the database.

**Options**
* `adapter` [`String`] - Name of the database adapter to be used (currently only `mongoose` is supported).
* `collection` [`String`] - Name of the collection/table in the database which possibly contains the value.
* `field` [`String`] - Name of the field/column in the collection/table which possibly contains the value.
* `messages`
 * `record_found` - Messages which is returned if the input value already exists in the database.

#### DbRecordExists
Verifies that the value is in the database. This means that the validation check will fail if there is no matching record in the database. Typical example is when you want to check if product's category exists at all before you insert product in the database.

**Options**
* `adapter` [`String`] - Name of the database adapter to be used (currently only `mongoose` is supported).
* `collection` [`String`] - Name of the collection/table in the database which possibly contains the value.
* `field` [`String`] - Name of the field/column in the collection/table which possibly contains the value.
* `messages`
 * `record_not_found` - Messages which is returned if the input value is not found in the database.

#### EmailAddress
Checks if the value is valid email address.

**Options**
* `messages`
 * `invalid_value` - Messages which is returned if the input value is not valid email address.

#### Identical
Checks if the value equals some other form element in the same form. Typical example is when you need to verify fields such as "new password" and "repeat new password" contain the same value.

**Options**
* `token` [`String`] - Name of the other element in the form.
* `messages`
 * `not_same` - Messages which is returned if the input value is not the same as the input value from the token element.

#### NotEmpty
Checks if the value is not empty. This validator can be used in cases where you have required elements in the form.

**Options**
* `messages`
 * `is_empty` - Messages which is returned if the input value is empty.

#### StringLength
Checks if the length of the string value fits `min` and/or `max` criteria defined in the validator options.

**Options**
* `min` [`Integer`] - Minimum string length.
* `max` [`Integer`] - Maximum string length.
* `messages`
 * `too_short` - Messages which is returned if the input value is shorter than the `min` value.
 * `too_long` - Messages which is returned if the input value is longer than the `max` value.

#### Url
Checks if the value is valid URL.

**Options**
* `messages`
 * `invalid_url` - Messages which is returned if the input value is not valid URL.

## Who is using it
The `carbon-validate` module is one of many that is running behind our web application: [Timelinity](https://www.timelinity.com)

## Contributing
If you're willing to contribute to this project feel free to report issues, send pull request, write tests or simply contact me - [Amir Ahmetovic](https://github.com/choxnox)
