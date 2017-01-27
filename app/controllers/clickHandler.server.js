'use strict'

var Clicks = require('../models/click.js');

function clickHandler ()

  this.getClicks = function (req, res){

    clicks.findOne({}, clickProjection, function( err, result) {

      if(err){
        throw err;
      }

      if(result){
        res.json(result);
      } else {
        clicks.insert({ 'clicks': 0 }, function (err){
          if(err){
            throw err;
          }

          clicks.findOne({}, clickProjection, function(err, doc){
            if(err){
              throw err;
            }

            res.json(doc);
          });
        });
      }
    });
  };

  this.addClicks = function (req, res){
    clicks
      .findAndModify(
        {},
        { '_id': 1 },
        { $inc: { 'clicks': 1 }},
        function (err, result){
          if(err) { throw err; }

          res.json(result);
        }
      );
  };

  this.resetClicks = function (req, res){
    clicks
      .update(
        {},
        { 'clicks': 0},
        function(err, result){
          if(err) { throw err; }

          res.json(result);
        }
      );
  };
}

module.exports = clickHandler;
