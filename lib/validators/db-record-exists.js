var Validate = require("../index");
var util = require("util");
var _ = require("lodash");

function DbRecordExists(options) {
    options = _.extend({
        adapter: null,
        collection: null,
        field: null
    }, options);

    this._messages = {
        no_adapter: "No adapter was selected",
        record_not_found: "Record is not found in the database",
    };

    Validate.call(this, options);
}

util.inherits(DbRecordExists, Validate);

DbRecordExists.prototype.isValid = function(value, context, callback) {
    var validator = this;

    switch (this._options["adapter"].toLowerCase())
    {
        case "mongoose":
            var mongoose = require("mongoose");
            var fields = {};
            var query = {};

            fields[this._options.field] = mongoose.Schema.Types.Mixed;
            query[this._options.field] = value;

            var model = mongoose.model("carbon-validate-db-record-exists", fields, this._options.collection, {
                cache: false
            });

            model
                .find(query)
                .exec(function(err, result) {
                    if (!result.length)
                        validator.error("record_not_found");

                    callback(validator.getError(), value);
                })
            ;

            break;

        default:
            this.error("no_adapter");
            callback(this.getError(), value);
            break;
    }
};

module.exports = exports = DbRecordExists;