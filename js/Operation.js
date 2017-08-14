class Operation {
    /**
     * Operation constructor
     * @param {int} op1 is the first operator, it can be random or selected by user
     * @param {int} op2 is the second operator, always random
     * @param {int} choices_number is the number of choice displayed to user (including good answer)
     */
    constructor(op1, op2, choices_number){
        this.op1 = op1;
        this.op2 = op2;
        this.res = op1*op2;

        var choices = [];
        choices.push(op1*op2);

        while (choices.length < choices_number){
          var rand = getRandomIntInclusive(1,10);
          // Choices values are calculated with a random second operator, theses values are different.
          if (choices.indexOf(op1*rand) == -1){
            choices.push(op1*rand);
          }
        }

        this.choices = shuffle(choices);
        this.answers = [];

        this.starting_time = 0;
        this.ending_time = 0;
        this.duration = 0;
    }

    /**
     * Start operation duration and return choices values
     * @return [{int}] choices is a list of integers generated by constructor
     */
    getChoices(){
        this.starting_time = new Date().getTime();
        return this.choices;
    }

    /**
     * Add user answer to the list of all answers
     * @param {int} value is the user answer
     * @return {boolean} true if operation is correct
     */
    addAnswer(value){
        this.answers.push(parseInt(value));

        // If operation is correct then stop duration timer and save it
        if(this.isCorrect()){
            this.setDuration();
            return true;
        }
        return false;
    }

    /**
     * Calculated duration time and save it
     */
    setDuration(){
        this.ending_time = new Date().getTime();
        var duration = (this.ending_time - this.starting_time) / 1000.00;
        this.duration = duration.toFixed(2);
    }

    /**
     * Check if the last user answer is correct (is equal to real answer res)
     * @return {boolean} true if operation is correct
     */
    isCorrect(){
        if (this.answers[this.answers.length-1] == this.res){
            return true;
        } else {
            return false;
        }
    }

    /**
     * Get number of errors
     * @return {int} true if operation is correct
     */
    getErrors(){
        if(this.answers.length == 1){
            if(this.isCorrect()){
                return 0;
            } else {
                return 1;
            }
        }
        return this.answers.length-1;
    }

    /**
     * Return operation as string
     * @return {String}
     */
    displayCalc(){
        return this.op1+" * "+this.op2;
    }

    /**
     * Hydrate operation with session's saved data
     * @param {object} data containing Operation data as Object
     */
    hydrate(data){
        var k =  Object.keys(data);
        for(var i=0, len = k.length; i<len; i++){
            this[k[i]] = data[k[i]];
        }
    }
}