class CounterService{
    constructor() {
        this.counter = 0;
    }

    getCounter(){
        return this.counter;
    }

    incrementCounter(){
        this.counter+=1;
    }
}

module.exports = CounterService;