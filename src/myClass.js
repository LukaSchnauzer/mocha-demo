class MyClass {
    constructor() {
        console.log('initialize');
    }

    add ( arg1 , arg2){
        let result;
        result = arg1 + arg2;
        return result;
    }

    callAnotherFn (arg1, arg2){
        let result = this.add(arg1,arg2);
        return result;
    }

    callTheCallback(callback){
        callback();
    }

    sayHello(str){
        console.log('Hello ',str);
    }

    callAnotherFnWithHello (arg1, arg2){
        this.sayHello('Juan');
        let result = this.add(arg1,arg2);
        return result;
    }

    // Promise resolves after 3 secs and returns 6
    demoPromise (){
        return new Promise( (resolve,reject) => {
            setTimeout( () => resolve(3), 3000 );
        }).then( result => result * 2)
        ;
    }
}

module.exports = MyClass;