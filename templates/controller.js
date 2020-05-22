var {modelName} = require({modelPath});
const mongoose = require('mongoose');
/**
 * {controllerName}.js
 *
 * @description :: Server-side logic for managing {pluralName}.
 */
var ObjectId = mongoose.Types.ObjectId;
var collection = {};

/**
 * {controllerName}.list()
 */
collection.get = function() {
    return new Promise((resolve,reject) => {
        {modelName}.find(function (err, {pluralName}) {
            if(err){
                return reject(err);
            }
            resolve({pluralName});
        });
    });
};

/**
 * {controllerName}.getOne()
 */
collection.getOne = function({name}_id) {
    return new Promise((resolve,reject) => {
        {modelName}.findOne({_id:ObjectId({name}_id)}, function(err, {name}) {
            if(err){
                return reject(err);
            }
            if(!{name}){
                return reject("No matching {name} exists");
            }
            resolve({name});
        });
    });
};

/**
 * {controllerName}.create()
 */
collection.create = function ({name}_obj) {
    return new Promise((resolve,reject) => {
        var {name} = new {modelName}({{createFields}
        });

        {name}.save(function (err, {name}) {
            if (err) {
                return reject(err);
            }
            resolve({name});
        });
    });
};

/**
 * {controllerName}.update()
 */
collection.update = function ({name}_obj) {
    return new Promise((resolve,reject) => {
        {modelName}.findOne({_id: ObjectId({name}_obj.id)}, function (err, {name}) {
            if (err) {
                return reject(err);
            }
            if (!{name}) {
                return reject("No matching {name} exists");
            }

            {updateFields}
            {name}.save(function (err, {name}) {
                if (err) {
                    return reject(err);
                }
                resolve({name});
            });
        });
    });
};

/**
 * {controllerName}.remove()
 */
collection.remove = function ({name}_id) {
    return new Promise((resolve,reject) => {
        {modelName}.findByIdAndRemove(ObjectId({name}_id), function (err, {name}) {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

module.exports = collection;
