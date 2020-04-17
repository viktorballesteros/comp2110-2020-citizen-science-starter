import {Model} from '../../static/js/model.js';
var assert = chai.assert;

describe('Model', function(){

    describe("#instantiate", function(){
        it('has a get_observations method', function(){
            assert.typeOf(Model.get_observations, 'function');
        });
    });

    describe("#update_observations", function(){
        it("should eventually trigger a modelChanged event with updated observations", function(done){
            let instance = Object.assign({}, Model);
            instance.update_observations();
            function handler(e) {
                let observations = instance.get_observations();
                assert.isArray(observations);
                // check some properties
                assert.property(observations[0], "timestamp");
                assert.property(observations[0], "height");
                window.removeEventListener("modelChanged", handler);
                done();
            }
            window.addEventListener('modelChanged', handler);
        });
    });

    describe("#update_users", function(){
        it("should eventually trigger a modelChanged event with updated users", function(done){
            let instance = Object.assign({}, Model);
            instance.update_users();
            function handler(e) {
                let users = instance.get_users();
                assert.isArray(users);
                assert.property(users[0], "first_name");
                assert.property(users[0], "last_name");
                window.removeEventListener("modelChanged", handler);
                done();
            }
            window.addEventListener('modelChanged', handler);
        });
    });

    describe("#getuser_observations", function(){
        it("should return just the observations for one user", function(done){
            let instance = Object.assign({}, Model);
            instance.update_observations();
            function handler(e) {
                let obs = instance.get_user_observations(2);
                assert.equal(obs.length, 3, "wrong number of observations for user '2'");
                window.removeEventListener("modelChanged", handler);
                done();
            }
            window.addEventListener('modelChanged', handler);
        });
    });


});