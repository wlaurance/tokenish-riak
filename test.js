var tr = require('./index'),
  assert = require('assert'),
  tr = tr(),
  token;

describe('tokenish riak', function(){
  it('should have an add method', function(){
    assert.equal(typeof(tr.add), 'function');
  });
  it('should have a get method', function(){
    assert.equal(typeof(tr.get), 'function');
  });
  it('should add a token to the list based on a key', function(done){
    token = new Date().toJSON();
    tr.add('id', token, function(err){
      done();
    });
  });
  it('should get a list of tokens', function(done){
    tr.get('id', function(err, tokens){
      assert.equal('number', typeof tokens.length);
      assert.ok(tokens.length);
      var found = false,
        i;
      for (i in tokens){
        if(tokens[i] === token){
          found = true;
          break;
        }
      }
      assert.ok(found);
      done();
    });
  });
});
