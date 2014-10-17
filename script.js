
$(function() {
    var MAX_PAGES = 10; // 10 is the max

    var $user = $('[data-js-hook="user"]');
    var $commits = $('[data-js-hook="commits"]');
    var $userInput = $('[name="user"]');
    var $updateButton = $('[data-js-hook="update"]');
    var $output = $('[data-js-hook="output"]');

    var commitCount = 0;

    $updateButton.click(function() {
        initialize();
        var defferedObjects = sendAjaxRequestsForGithubUserEvents(getUserName());
        $.when.apply($, defferedObjects).done(updateCommitCount);  
    });

    function initialize() {
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
            var pushEvents = filterEventsByType(response, 'PushEvent')
            getNumberOfCommitsFor(pushEvents);
        });
    }

    function buildGithubApiCallUrl(pageNumber) {
        return 'https://api.github.com/users/' + getUserName() + '/events/public?page=' + pageNumber;
    }

    function getUserName() {
        var userName = $userInput.val()
        $user.html(userName);
        return userName;
    }

    function filterEventsByType(events, eventType) {
        var filterEvents = []
        $.grep(events, function(n) {
            if (n['type'] === eventType){
                filterEvents.push(n)
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
        $commits.html(commitCount);
    }

});
