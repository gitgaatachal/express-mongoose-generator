var express = require('express');
var router = express.Router();
var {controllerName} = require({controllerPath});

/*
 * GET - all items
 */
router.get('/', (req,res,next) => {
    {controllerName}.get()
    .then((result) => {
        res.status(200).json({result:true,data:result});
    })
    .catch((err) => {
        console.log("Error getting list " + err);
        res.status(405).json({result:false, message:"Unable to get any data at the moment"});
    });
});

/*
 * GET - specific item for the id
 */
router.get('/:id', (req, res, next) => {
    {controllerName}.getOne(req.params.id)
    .then((result) => {
        res.status(200).json({result:true,data:result});        
    })
    .catch((err) => {
        console.log("Error getting item " + err);
        res.status(405).json({result:false, message:"Unable to get any data at the moment"});
    });
});

/*
 * POST - create new item
 */
router.post('/', (req, res, next) => {
    {controllerName}.create(req.body.data)
    .then((result) => {
        res.status(200).json({result:true,data:result});        
    })
    .catch((err) => {
        console.log("Error creating item " + err);
        res.status(405).json({result:false, message:"Unable to add any data at the moment"});
    });
});

/*
 * PUT - Edit existing item
 */
router.put('/:id', (req, res, next) => {
    const data = {id:req.params.id, ...req.body.data}
    {controllerName}.update(data)
    .then((result) => {
        res.status(200).json({result:true,data:result});
    })
    .catch((err) => {
        console.log("Error editing item " + err);
        res.status(405).json({result:false, message:"Unable to edit any data at the moment"});
    });
});

/*
 * DELETE - Delete existing item
 */
router.delete('/:id', (req, res, next) => {
    {controllerName}.remove(req.params.id)
    .then(() => {
        res.status(200).json({result:true,data:"Successfully deleted"});        
    })
    .catch((err) => {
        console.log("Error deleting item " + err);
        res.status(405).json({result:false, message:"Unable to delete any data at the moment"});
    });
});

module.exports = router;
