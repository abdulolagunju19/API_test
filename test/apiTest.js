//assertions are built in to Node.js
var assert = require('assert');

var supertest = require('supertest');

var app = require('../server.js');

describe('API Tests', function (){
    describe('Post entry to database', function (){
        it('Returns created resource on success', function(done) {
            var validEntry = {
                username: 'Boollea',
                firstName: 'Boolander',
                email: 'Bool@gmail.com'
            };
            
            supertest(app)
                .post('/users')
                .send(validEntry)
                .expect(201)
                .end(function(error, res) {
                    if (error) {
                        return done(error);
                    }
                    assert.equal(res.body.username, validEntry.username);
                    assert.equal(res.body.firstName, validEntry.firstName);
                    assert.equal(res.body.email, validEntry.email);

                    done();
                });
        });
    });
});