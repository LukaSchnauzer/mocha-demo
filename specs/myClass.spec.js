const MyClass = require('../src/myClass');
const sinon = require('sinon');
const chai = require('chai');
const chaiaspromise = require('chai-as-promised');
const expect = chai.expect;

chai.use(chaiaspromise);
let myObj = new MyClass();

describe('Test suit',() => {

    after ( () => { console.log('After test suit');});

    before ( () => { console.log('Before test suit');});

    //afterEach ( () => { console.log('after each test case')});

    // revert all mocks
    beforeEach ( () => { sinon.restore(); });

    it('Test add method', () => {
        // expect, assert or should
        expect(myObj.add(1,2)).to.be.equal(3);
    });

    it('Spy add method', () => {
        let spy = sinon.spy(myObj, 'add');
        let arg1 = 10, arg2 = 20;

        myObj.callAnotherFn(arg1,arg2);
        //sinon.assert.calledOnce(spy);
        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith(arg1, arg2)).to.be.true;
    });

    it('Spy callback method', () => {
        let callback = sinon.spy(); // dummy callback
        myObj.callTheCallback( callback );
        expect(callback.calledOnce).to.be.true;
    });

    it('Mock say hello method', () => {
        let mock = sinon.mock(myObj);
        let expectation = mock.expects('sayHello');
        expectation.exactly(1);
        expectation.withArgs('Juan');
        myObj.callAnotherFnWithHello(10, 20);
        mock.verify();
        // 'Hello' should not be printed in console
    });
});

describe.skip('Test suit for stub', () => {
    it('Stub add method', () => {
        let stub = sinon.stub(myObj, 'add');
        stub.withArgs(10,20).returns(100); //assuming it returns 100
        expect(myObj.callAnotherFn(10,20)).to.be.equal(100);
    });
});

describe('Test promise', () => {
    it('Promise test case', function(){
        this.timeout(5000); // Sets timeout for testing promises timeout(0) waits as long as necessary (can't be used with arrow functions)
        //myObj.demoPromise().then( result => {
        //    expect(result).to.be.equal(6);
        //    done(); // To test promises (needs done in args)
        //});

        // With chai-as-promised
        expect(myObj.demoPromise()).to.eventually.equal(6);
    });
});
