const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usage = require('../models/usage'); //here we include the model we created using the usage model with a particular scheme. we will use the variable to perform different operations on the database

const usageRouter = express.Router();

//Home Page
usageRouter.route('/')
.get((req,res,next) => {
    res.end("just checking --> nothing to do")
})
.post((req, res, next) => {
})
.put((req, res, next) => {
})
.delete((req, res, next) => {
});

//Create Usage
usageRouter.route('/create')
.get((req,res,next) => {
    res.render('newusage.ejs', { title: 'New Screen Time Usage' });   
})
.post((req, res, next) => {
    usage.create(req.body) // the request body should provide date, name, educational, browsing, shopping and social media usage as defined in the usage model -->schema
    .then((usagecreated) => { //if the usage is created then usagereated is set
        usage.find().sort({date: -1}) // if it is set then execute find function to find the usages in the list
        .then((usagefound) => { //if there are usages then provide the list in the next line
            res.render('currentusage',{'usagelist' : usagefound, title:'List Of Usages'} );
        }, (err) => next(err))
        .catch((err) => next(err)); // if usage.create is not successful ..
    }, (err) => next(err))
    .catch((err) => next(err)); //catch all errors --> http-error module. you can also print your message but in this case the module will handle it for you
})

//Delete Usage
usageRouter.route('/delete')
.get((req,res,next) => {
    res.render('deleteusage.ejs', { title: 'Delete Screen Time Usage' });   
})
.post((req, res, next) => {  
    usage.deleteOne({"_id" : req.body._id})
    .then((usagefound) => { 
        res.render('deletesuccess', {title:'Deleted Successfully'});
    }), (err) => next(err)
    .catch((err) => next(err));
})

//Update Usage
usageRouter.route('/update')
.get((req,res,next) => {
    res.render('updateusage.ejs', { title: 'Update Screen Time Usage' });   
})
.post((req, res, next) => {
    usage.findByIdAndUpdate({"_id" : req.body._id}, {"name": req.body.name, "educational_usage": req.body.educational_usage, 
                                                    "shopping_usage": req.body.shopping_usage, "browsing_usage": req.body.browsing_usage, 
                                                    "socialmedia_usage": req.body.socialmedia_usage})
    .then((usagecreated) => { //if the usage is created then usagecreated is set
        usage.find({"_id" : req.body._id}).sort({date: -1}) // if it is set then execute find function to find the usages in the list
        .then((usagefound) => { //if there are usages then provide the list in the next line
            res.render('updatesuccess',{'usagelist' : usagefound, title:'Updated Usage'});
        }), (err) => next(err)
        .catch((err) => next(err));})
    })

    //Report Usage
usageRouter.route('/report')
    .get((req,res,next) => {
        res.render('reportusage.ejs', { title: 'Report Screen Time Usage' }); 
})
.post((req, res, next) => {
    usage.find({"name" : req.body.name, "date" : {
        $gte: new Date(req.body.start_date).toISOString(), 
        $lte: new Date(req.body.end_date).toISOString()}}).sort({date: -1})
    .then((usagefound) => { //if there are usages then provide the list in the next line
        res.render('reportsuccess',{'usagelist' : usagefound, title:'Report Results'} );
    }), (err) => next(err)
    .catch((err) => next(err));
}) 

//List Usage
usageRouter.route('/list')
.get((req,res,next) => {
    res.render('list.ejs', {title: 'List All Usages'});   
})
.post((req, res, next) => {
    usage.find().sort({date: -1}) // if it is set then execute find function to find the usages in the list
    .then((usagefound) => { //if there are usages then provide the list in the next line
        res.render('listsuccess', {'usagelist' : usagefound, title:'List Of Usages'} );
    }, (err) => next(err))
    .catch((err) => next(err)); // if usage.create is not successful ..
}, (err) => next(err))

//About Us
usageRouter.route('/aboutus')
.get((req,res,next) => {
    res.render('aboutus.ejs', { title: 'About Us' });   
})

//Help
usageRouter.route('/help')
.get((req,res,next) => {
    res.render('help.ejs', { title: 'Help' });   
})

module.exports = usageRouter;