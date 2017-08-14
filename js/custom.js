/*******************************************************************************
 * Functions relatives to operation generation
 *******************************************************************************/

/**
 * Return random int between min and max (both are include)
 * @param {int} min
 * @param {int} max
 * @return {int}
 */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

/**
 * Shuffles array in place.
 * @param {Array} array items The array containing the items.
 * @return {Array} array.
 */
 function shuffle(array) {
   var currentIndex = array.length, temporaryValue, randomIndex;

   // While there remain elements to shuffle...
   while (0 !== currentIndex) {

     // Pick a remaining element...
     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex -= 1;

     // And swap it with the current element.
     temporaryValue = array[currentIndex];
     array[currentIndex] = array[randomIndex];
     array[randomIndex] = temporaryValue;
   }

   return array;
 }


 /*******************************************************************************
  * Functions relatives to LocalStorage
  *******************************************************************************/

 /**
  * @return {array} list of sessions
  */
function getSessionInLocalStorage(){
    return localStorage.getItem('sessions');
}

/**
 * @return {Session} last session item
 */
function getLastSession(){
    sessions = getSessionInLocalStorage();
    return sessions[sessions.length-1];
}

/**
 * @param {Session} session to save
 */
function addSessionToStorage(session){
    // Get all sessions saved in LocalStorage
    sessions = JSON.parse(getSessionInLocalStorage());
    if(sessions){
        // Add session to the saved session
        sessions.push(session);
        // Save Sessions data in localStorage
        localStorage.setItem('sessions', JSON.stringify(sessions));
    } else {
        localStorage.setItem('sessions', JSON.stringify([session]));
    }
}
