var {modelName} = require({modelPath});
const mongoose = require('mongoose');
const {hasKeyNonEmpty} = require('<filename>');

/**
 * {controllerName}.js
 *
 * @description :: Server-side logic for managing {pluralName}.
 */
var ObjectId = mongoose.Types.ObjectId;
var collection = {};

/**
 * Filter attributes and only take the relevant ones
 */
function filterAttributes(data){
    let filtered_data = {};
    {conditionalFilter}
    return filtered_data;
}

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

        var filteredData = filterAttributes({name}_obj);
        
        var {name} = new {modelName}(filteredData);

        {name}.save(function (err, {name}) {
            if (err) {
                return reject(err);
            }
            resolve({name});
        });
    });
};

/**
 * {controllerName}.createMany()
 */
collection.createMany = function ({pluralName}_data) {
    return new Promise((resolve,reject) => {
        
        let {pluralName}_arr = [];
        {pluralName}_data.forEach(element => {
            {pluralName}_arr.push(filterAttributes(element));
        });
        {modelName}.insertMany({pluralName}_arr, function(err, {pluralName}){
            if(err){
                return reject(err);
            }
            resolve({pluralName});
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

/**
 * {controllerName}.removeMany()
 */
collection.removeMany = function ({pluralName}_ids) {
    return new Promise((resolve,reject) => {
        {modelName}.remove({_id:{$in:{pluralName}_ids.map(id => ObjectId(id))}}, (err, result) => {
            if(err){
                return reject(err);
            }
            resolve(result);
        });
    });
};

module.exports = collection;

