class Session {
    /**
     * Session constructor
     * @param [{operations}] operations list
     */
     constructor(operations){
        this.operations = operations;
        this.index = 0;
        this.operations_count = 0;

        this.errors_count = 0;
        this.duration = 0;
        this.date = null;

        this.isEvaluating = false;
        this.isLearning = false;

        this.table = null;
    }

    /**
     * Generate operations list with a given length. Theses operations can be generated with one random numbers and a give one (op1)
     * or with 2 random numbers depending of the session's mode (Learning or Evaluating)
     * @param {int} operations_count
     * @param {int} op1
     */
    generateOperations(operations_count, op1 = null){
        this.operations_count = operations_count;
        this.operations = [];
        for (var i = 0; i < operations_count; i++) {
          if(op1){
              // If op1 is an int then generate Operation with a random second operator and set Operation mode to learning
              var rand = getRandomIntInclusive(1,10);
              this.operations.push(new Operation(op1, rand, 4));
              this.table = op1;
              this.isLearning = true;
          } else {
              // Generated Operation with two random operators and set Operation mode to evaluating
              var rand1 = getRandomIntInclusive(1,10);
              var rand2 = getRandomIntInclusive(1,10);
              this.operations.push(new Operation(rand1, rand2, 4));
              this.isEvaluating = true;
          }
        }
    }

    /**
     * Return current Operation
     * @return {Operation}
     */
    getOperation(){
        return this.operations[this.index];
    }

    /**
     * If current Operation is not the last then set current Operation to the next one.
     * @return {boolean} false if there are no more Operations
     */
    setNextOperation(){
        if(this.index < this.operations.length - 1){
            this.index++;
            return true;
        }
        return false;
    }

    /**
     * Calculate total errors and duration time
     */
    terminate(){
        for (var i = 0; i < this.operations_count; i++) {
            this.errors_count+= this.operations[i].getErrors();
            this.duration+= parseFloat(this.operations[i].duration);
        }
        this.duration = this.duration.toFixed(2);
        this.date = new Date().toLocaleString();
    }

    /**
     * Hydrate Session with session's saved data
     * @param {object} data containing Session data as Object
     */
    hydrate(data){
        var k =  Object.keys(data);
        for(var i=0, len = k.length; i<len; i++){
            this[k[i]] = data[k[i]];
        }
    }

    /**
     * Hydrate Session and all this operations with session's saved data
     * @param {object} data containing Session data as Object
     */
    hydrateAll(data){
        this.hydrate(data);
        var StoredOperations = this.operations;
        var operations = [];
        for (var i = 0; i < this.operations.length; i++) {
            var operation = new Operation();
            operation.hydrate(this.operations[i]);
            operations.push(operation);
        }
        this.operations = operations;

    }
};
