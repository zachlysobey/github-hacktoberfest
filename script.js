
$(function(){
    var MAX_PAGES = 10; // 10 is the max

    var $user = $('[data-js-hook="user"]');
    var $commits = $('[data-js-hook="commits"]');
    var $userInput = $('[name="user"]');
    var $updateButton = $('[data-js-hook="update"]');
    var $output = $('[data-js-hook="output"]');

    var commitCount = 0;

    $updateButton.click(function() {
        commitCount = 0;
        $output.show();
        console.log('updateButton clicked');
        $.when.apply($, getNumberOfPushCommitsForUser(getUserName())).done(function(){
            console.log('deffered has resolved', commitCount);
            $commits.html(commitCount);
        });  
    });

    function getUserName() {
        console.log('getUserName()');
        return $userInput.val();
    }

    function eventAPICallForUserNameAndPageNumber(name, pageNumber) {
        console.log('eventAPICallForUserNameAndPageNumber()');
        var githubApiCall = 'https://api.github.com/users/' + name + '/events/public?page=' + pageNumber;
        return $.ajax({ url: githubApiCall }).success(function(response){
            var pushEvents = filterEventsByType(response, 'PushEvent');
            var pushEventsByDate = filterEventsByDate(pushEvents, '2014-10');
            getNumberOfCommitsFor(pushEventsByDate);
        });
    };

    function filterEventsByType(events, eventType) {
        console.log('filterEventsByType()');
        var filterEvents = []
        $.grep(events, function(n) {
            if (n['type'] === eventType){
                filterEvents.push(n)
            };
        }); 
        return filterEvents
    };

    function filterEventsByDate(events, eventDate) {
        var filterEvents = [];
        $.grep(events, function(n) {
            if (n['created_at'].substr(0, eventDate.length) === eventDate){
                filterEvents.push(n);
            };
        });
        return filterEvents;
    };

    function getNumberOfCommitsFor(githubEvents) {
        console.log('getNumberOfCommitsFor()');
        githubEvents.forEach(function(githubEvent) {
            var commits = githubEvent.payload.commits.length;
            commitCount += commits;
            console.log(githubEvent, commits);
        }); 
    };

    function getNumberOfPushCommitsForUser(userName) {
        console.log('getNumberOfPushCommitsForUser()');
        $user.html(userName);
        var deferredObjects = [];
        for (var pageNumber = 1; pageNumber <= MAX_PAGES; pageNumber++) {
            deferredObjects.push(eventAPICallForUserNameAndPageNumber(userName, pageNumber));
        }
        return deferredObjects
    };

});
