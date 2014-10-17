
$(function() {

    /**
     * 10 is the maximimum pagination of events endpoint. 
     * With 30 results each, no more than 300 events can be processed 
     */
    var MAX_PAGES = 10; 
    
    var commitCount = 0;
    
    var $updateButton = $('[data-js-hook="update"]');

    $updateButton.click(function() {
        var defferedObjects = sendAjaxRequestsForGithubUserEvents(getUserName());
        initialize();
        $.when.apply($, defferedObjects).done(updateCommitCount);  
    });

    function initialize() {
        var $output = $('[data-js-hook="output"]');
        commitCount = 0;
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
            var pushEvents = filterEventsByType(response, 'PushEvent');
            getNumberOfCommitsFor(pushEvents);
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

    function getNumberOfCommitsFor(githubEvents) {
        githubEvents.forEach(function(githubEvent) {
            var commits = githubEvent.payload.commits.length;
            commitCount += commits;
            console.log(githubEvent, commits);
        }); 
    }

    function updateCommitCount() {
        var $commits = $('[data-js-hook="commits"]');
        $commits.html(commitCount);
    }
});
