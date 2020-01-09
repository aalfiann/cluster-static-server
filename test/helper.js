const assert = require('assert');
const helper = require('../lib/helper.js');
const fs = require('fs');
var config_node = require('../config-node.js');

describe('helper function test', function(){

    it('check config has key', function(){
        assert.equal(helper.isHasKey('x_token'),true);
    });

    it('get json date', function(){
        var dt = helper.jsonDate();
        assert.equal(dt.hasOwnProperty('year'),true);
        assert.equal(dt.hasOwnProperty('month'),true);
        assert.equal(dt.hasOwnProperty('date'),true);
    });

    it('set json date', function(){
        var dt = helper.jsonDate('2020-01-15');
        assert.equal(dt.year,'2020');
        assert.equal(dt.month,'01');
        assert.equal(dt.date,'15');
    });

    it('check config allow mime', function(){
        assert.equal(helper.isAllowedMime('image/png'),true);
        assert.equal(helper.isAllowedMime('text/html'),false);
    });

    it('check empty config allow mime', function(){
        delete config_node.allowMime;
        assert.equal(helper.isAllowedMime('text/html'),true);
    });

    it('get extension from string', function(){
        assert.equal(helper.getExtension('file.png'),'.png');
        assert.equal(helper.getExtension('file'),'');
    });

    it('get random number from item array', function(){
        var item = [
            {name:'andy',age:10},
            {name:'bobby',age:20},
            {name:'charlie',age:30}
        ];
        assert.equal(isNaN(helper.randomItem(item)),false);
    });

    it('remote upload file with non secure http promise', function(done){
        this.timeout('10000');
        helper.fileDownloadPromise('http://via.placeholder.com/300','test/test.png').then((result)=>{
            if(result) {
                var downloaded = fs.existsSync('test/test.png');
                assert.equal(downloaded,true);
                if(downloaded) {
                    fs.unlinkSync('test/test.png');
                }
                done();
            }
        }).catch((err) => {
            done(err);
        });
    });

    it('remote upload file with secure https promise', function(done){
        this.timeout('10000');
        helper.fileDownloadPromise('https://via.placeholder.com/300','test/test-ssl.png').then((result)=>{
            if(result) {
                var downloaded = fs.existsSync('test/test-ssl.png');
                assert.equal(downloaded,true);
                if(downloaded) {
                    fs.unlinkSync('test/test-ssl.png');
                }
                done();
            }
        }).catch((err) => {
            done(err);
        });
    });

    it('remote upload file with async await', function(done){
        async function down() {
            return await helper.fileDownload('https://via.placeholder.com/300','test/test-async.png');
        }
        this.timeout('10000');
        var result = down();
        if(result) {
            var downloaded = fs.existsSync('test/test-async.png');
            assert.equal(downloaded,true);
            if(downloaded) {
                fs.unlinkSync('test/test-async.png');
            }
            done();
        }
    });

    it('remote upload file empty url will catch error', function(done){
        this.timeout('10000');
        helper.fileDownloadPromise('','test/test-catch.png').then((result)=>{
            if(result) {
                var downloaded = fs.existsSync('test/test-ssl.png');
                assert.equal(downloaded,true);
                done();
            }
        }).catch((err) => {
            fs.unlinkSync('test/test-catch.png');
            done(err);
        });
    });

});