var Store = {
    sessions: null,
    currentSession: null,
};

// Home page with navigation links
var Home = {
    template: '#tpl-home'
};

// Session page in evaluating mode, Operations are generated with 2 random operators
var Evaluating = {
    template: '#tpl-operation',

    data: function (){
        return Store
    },

    mounted: function(){
        // Generate a new Session with 10 random operations
        session = new Session();
        session.generateOperations(10);
        // Save Session in the Store
        Store.currentSession = session;
    },

    methods: {
        checkResult: function(e) {
            // Get input user value
            var selectedResult = e.target;
            var value = $(selectedResult).text();

            // Get current operation
            operation = Store.currentSession.getOperation();
            // Add user answer to the operation
            if(operation.addAnswer(value)){
                console.log('Réponse correcte');
            } else {
                console.log('Réponse incorrecte');
            }
            // Calculate duration of the operation
            operation.setDuration();

            // Set next operation
            if(!Store.currentSession.setNextOperation()){
                //If operation is the last of the session then close the session
                Store.currentSession.terminate();
                // Save Operation in LocalStorage (key : "sessions")
                addSessionToStorage(Store.currentSession);
                // Go to the result page of the session
                router.push({ name: 'results' });
            }
        }
    }
}

// Session page in learning mode, an operator is required to initiate session and all the operations
var Learning = {
    template: '#tpl-operation',
    data: function(){
        return Store
    },

    mounted: function(){
        // Get operator in the route parameters (path: '/learning/:table')
        var table = this.$route.params.table;
        // Generate a new Session with 10 operation, the first operator is always the table var.
        session = new Session();
        session.generateOperations(10, table);
        // Save Session in the Store
        Store.currentSession = session;
    },

    methods: {
        checkResult: function(e) {
            // Get input user value
            var selectedResult = e.target;
            var value = $(selectedResult).text();

            // Get current Operation
            operation = Store.currentSession.getOperation();
            // Add value to the answers, next Operation is set only if value is correct.
            if(operation.addAnswer(value)){
                console.log('Réponse correcte');
                $(".btn-answer").removeClass("disabled");
            } else {
                console.log('Réponse incorrecte');
                $(selectedResult).addClass("disabled");
                return;
            }
            // Set next operation
            if(!Store.currentSession.setNextOperation()){
                //If operation is the last of the session then close the session
                Store.currentSession.terminate();
                // Save Operation in LocalStorage (key : "sessions")
                addSessionToStorage(Store.currentSession);
                // Go to the result page of the session
                router.push({ name: 'results' });
            }
        }
    }
}

// Table page allowing user to select an operator.
var Table = {
    template: '#tpl-table',

    data: function(){
        return Store
    }
}

// Result page containing the session's operations with user's answers
var Results = {
    template: '#tpl-results',

    data: function (){
        return Store
    }
}

// History page displaying all sessions saved in localStorage
var zHistory = {
    template: '#tpl-history',

    data: function(){
        return Store
    },

    mounted: function(){
        // Get all sessions data saved in LocalStorage (key="sessions")
        StoredSessions = getSessionInLocalStorage();
        session_data = JSON.parse(StoredSessions);
        sessions = [];
        // Generate real Session that are hydrated by stored data.
        for (var i = 0; i < session_data.length; i++) {
            session = new Session();
            session.hydrateAll(session_data[i]);
            sessions.push(session);
        }
        // Save Sessions in Store
        this.sessions = sessions;
    },

    methods: {
        getResultPage: function(e) {
            // Get selected session
            var selectedResult = e.target;
            var index = $(selectedResult).attr('data-index');

            // Save selected session as current Session in Store
            this.currentSession = this.sessions[index];
            // Go to the result page of the session
            router.push({ name: 'results' });
        }
    }
}

var routes = [
    {name: "home", path: '/', component: Home},
    {name: "learning", path: '/learning/:table', component: Learning},
    {name: "evaluating", path: '/evaluating', component: Evaluating},
    {name: "table", path:'/table', component: Table},
    {name: "results", path: '/results', component: Results},
    {name: "history", path: '/history', component: zHistory},
];

var router = new VueRouter({
    routes: routes
});

var vue = new Vue({
    el: "#app",

    router: router,

    data: {
        store: Store
    }

});
