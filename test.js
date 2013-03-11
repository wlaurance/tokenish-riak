var tr = require('./index'),
  assert = require('assert'),
  _ = require('underscore'),
  tr = tr(),
  token;

describe('tokenish riak', function(){
  it('should have an add method', function(){
    assert.equal(typeof(tr.add), 'function');
  });
  it('should have a get method', function(){
    assert.equal(typeof(tr.get), 'function');
  });
  it('should have a delete function', function(){
    assert.equal(typeof(tr.delete), 'function');
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
      assert.notEqual(_.indexOf(tokens, token), -1);
      done();
    });
  });
  it('should delete a token', function(done){
    tr.delete('id', token, function(err){
      tr.get('id', function(err, tokens){
        assert.equal(_.indexOf(tokens, token), -1);
        done();
      });
    });
  });
});
