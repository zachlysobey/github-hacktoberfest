$(function() {

    /**
     * 10 is the maximimum pagination of events endpoint. 
     * With 30 results each, no more than 300 events can be processed 
     */
    var MAX_PAGES = 10;
    
    var pullCount = 0;
    
    var $updateButton = $('[data-js-hook="update"]');

    $updateButton.click(function() {
        var deferredObjects = sendAjaxRequestsForGithubUserEvents(getUserName());
        initialize();
        $.when.apply($, deferredObjects).done(updateCommitCount);  
    });

    function initialize() {
        var $output = $('[data-js-hook="output"]');
        pullCount = 0;
        $output.show();
    }

    function sendAjaxRequestsForGithubUserEvents() {
        var deferredObjects = [];
        for (var pageNumber = 1; pageNumber <= MAX_PAGES; pageNumber++) {
            deferredObjects.push(eventAPICallForUserNameAndPageNumber(pageNumber));
        }
        return deferredObjects
    }

    function eventAPICallForUserNameAndPageNumber(pageNumber) {      
        return $.ajax(buildGithubApiCallUrl(pageNumber)).success(function(response){
            var pullEvents = filterEventsByType(response, 'PullRequestEvent');
            var pullEvents2 = filterEventsByAction(pullEvents, 'opened');
            var pullEventsByDate = filterEventsByDate(pullEvents2, '2015-10');
            pullCount = pullEventsByDate.length;
            //getNumberOfCommitsFor(pullEventsByDate);
        });
    }

    function buildGithubApiCallUrl(pageNumber) {
        return 'https://api.github.com/users/' + getUserName() + '/events/public?page=' + pageNumber;
    }

    function getUserName() {
        var $user = $('[data-js-hook="user"]');
        var $userInput = $('[name="user"]');
        var userName = $userInput.val()
        $user.html(userName);
        return userName;
    }

    function filterEventsByType(events, eventType) {
        var filterEvents = []
        $.grep(events, function(event) {
            if (event['type'] === eventType) {
                filterEvents.push(event);
            };
        }); 
        return filterEvents
    }
    
    function filterEventsByAction(events, actionType) {
        var filterEvents = []
        $.grep(events, function(event) {
            if (event.payload.action === actionType) {
                filterEvents.push(event);
            };
        }); 
        return filterEvents
    }

    function filterEventsByDate(events, eventDate) {
        var filterEvents = [];
        $.grep(events, function(n) {
            if (n['created_at'].substr(0, eventDate.length) === eventDate){
                filterEvents.push(n);
            };
        });
        return filterEvents;
    };
    
    /*
    function getNumberOfCommitsFor(githubEvents) {
        githubEvents.forEach(function(githubEvent) {
            var commits = githubEvent.payload.commits.length;
            commitCount += commits;
            console.log(githubEvent, commits);
        }); 
    }
    */

    function updateCommitCount() {
        var $commits = $('[data-js-hook="commits"]');
        $commits.html(commitCount);
    }
});
