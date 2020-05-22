/**
 * Module dependencies
 */
var ft = require('./fileTools');
var formatTools = require('./formatTools');
var os = require('os');

/**
 * Generate a Mongoose model
 * @param {string} path
 * @param {string} modelName
 * @param {array} modelFields
 * @param {string} generateMethod
 * @param {boolean} ts generating code in TS
 * @param {function} cb
 */
function generateModel(path, modelName, modelFields, generateMethod, ts, cb) {
    var fields = formatTools.getFieldsForModelTemplate(modelFields);
    var schemaName = modelName + 'Schema';

    var extension = (ts) ? 'ts' : 'js';
    var model = ft.loadTemplateSync('model.' + extension);
    model = model.replace(/{modelName}/, modelName);
    model = model.replace(/{schemaName}/g, schemaName);
    model = model.replace(/{fields}/, fields);

    if (generateMethod === 't') {
        ft.createDirIfIsNotDefined(path, 'models', function () {
            ft.writeFile(path + '/models/' + modelName + '_model.' + extension, model, null, cb);
        });
    } else {
        ft.createDirIfIsNotDefined(path, modelName, function () {
            ft.writeFile(path + '/' + modelName + '/' + modelName + '_model.' + extension, model, null, cb);
        });
    }
}

/**
 * Generate a Express router
 * @param {string} path
 * @param {string} modelName
 * @param {string} generateMethod
 * @param {boolean} ts generating code in TS
 * @param {function} cb
 */
function generateRouter(path, modelName, generateMethod, ts, cb) {
    var extension = (ts) ? 'ts' : 'js';
    var router = ft.loadTemplateSync('router.' + extension);
    router = router.replace(/{controllerName}/g, formatTools.capitalizeAll(modelName + '_controller'));

    if (generateMethod === 't') {
        ft.createDirIfIsNotDefined(path, 'routes', function () {
            router = router.replace(/{controllerPath}/g, '\'../controllers/' + modelName + '_controller.' + extension + '\'');
            ft.writeFile(path + '/routes/' + modelName + '_routes.' + extension, router, null, cb);
        });
    } else {
        ft.createDirIfIsNotDefined(path, modelName, function () {
            router = router.replace(/{controllerPath}/g, '\'./' + modelName + '_controller.' + extension + '\'');
            ft.writeFile(path + '/' + modelName + '/' + modelName + '_routes.' + extension, router, null, cb);
        });
    }
}

/**
 * Generate Controller
 * @param {string} path
 * @param {string} modelName
 * @param {array} modelFields
 * @param {string} generateMethod
 * @param {boolean} ts generating code in TS
 * @param {function} cb
 */
function generateController(path, modelName, modelFields, generateMethod, ts, cb) {
    var extension = (ts) ? 'ts' : 'js';
    var controller = ft.loadTemplateSync('controller.' + extension);

    var updateFields = '';
    var createFields = os.EOL;
    var insertManyFields = '';
    var conditionalFilter = '';

    modelFields.forEach(function (f, index, fields) {
        var field = f.name;

        // updateFields += modelName + '.' + field + ' = req.body.' + field + ' ? req.body.' + field + ' : ' +
        updateFields += modelName + '.' + field + ' = ' + modelName + '_obj.' + field + ' ? ' + modelName + '_obj.' + field + ' : ' +
            modelName + '.' + field + ';';
        updateFields += os.EOL + '\t\t\t';

        //createFields += '\t\t\t' + field + ' : req.body.' + field;
        createFields += '\t\t\t' + field + ' : ' + modelName + '_obj.' + field;
        createFields += ((fields.length - 1) > index) ? ',' + os.EOL : '';

        insertManyFields += '\t\t\t' + field + ' : ' + 'element.' + field;
        insertManyFields += ((fields.length - 1) > index) ? ',' + os.EOL : '';

        conditionalFilter += os.EOL + '\t' + 'if(hasKeyNonEmpty(data,"' + field + '")) {' + os.EOL;
        conditionalFilter += '\t\t' + 'filtered_data["' + field + '"] = data.' + field + ';' + os.EOL;
        conditionalFilter += '\t' + '}' + os.EOL;
    });

    controller = controller.replace(/{modelName}/g, formatTools.capitalizeAll(modelName + '_model'));
    controller = controller.replace(/{name}/g, modelName);
    controller = controller.replace(/{pluralName}/g, formatTools.pluralize(modelName));
    controller = controller.replace(/{controllerName}/g, modelName + '_controller');
    controller = controller.replace(/{createFields}/g, createFields);
    controller = controller.replace(/{updateFields}/g, updateFields);
    controller = controller.replace(/{insertManyFields}/g, insertManyFields);
    controller = controller.replace(/{conditionalFilter}/g, conditionalFilter);

    if (generateMethod === 't') {
        ft.createDirIfIsNotDefined(path, 'controllers', function () {
            controller = controller.replace(/{modelPath}/g, '\'../models/' + modelName + '_model.' + extension + '\'');
            ft.writeFile(path + '/controllers/' + modelName + '_controller.' + extension, controller, null, cb);
        });
    } else {
        ft.createDirIfIsNotDefined(path, modelName, function () {
            controller = controller.replace(/{modelPath}/g, '\'./' + modelName + '_model.' + extension + '\'');
            ft.writeFile(path + '/' + modelName + '/' + modelName + '_controller.' + extension, controller, null, cb);
        });
    }
}

module.exports = {
    generateModel: generateModel,
    generateRouter: generateRouter,
    generateController: generateController
};

