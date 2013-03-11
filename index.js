var riak = require('riak-js'),
 _ = require('underscore');
module.exports = function(config){
  if(!config){
    config = {
      bucket:'tokenish'
    };
  }
  var client = riak.getClient({
    host: config.host || '127.0.0.1',
    port: config.port || 8098
  });
  return {
    get:function(id, callback){
      client.get(config.bucket, id, function(err, tokens, meta){
        if (typeof tokens.length === 'undefined'){
          tokens = [];
        }
        callback(err, tokens);
      });
    },
    add:function(id, token, callback){
      client.get(config.bucket, id, function(err, tokens, meta){
        if (typeof tokens.length === 'undefined'){
          tokens = [];
        }
        tokens.push(token);
        client.save(config.bucket, id, tokens, function(err){
          callback(err, token);
        });
      });
    },
    delete:function(id, token, callback){
      client.get(config.bucket, id, function(err, tokens, meta){
        if (typeof tokens.length === 'undefined'){
          return callback(new Error('tokens not defined'));
        }
        client.save(config.bucket, id, _.without(tokens, token), function(err){
          callback(err);
        });
      });
    },
    deleteAll:function(id, callback){
      client.save(config.bucket, id, [], function(err){
        callback(err);
      });
    }
  };
};
