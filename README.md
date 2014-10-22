# gitHub Hacktoberfest Counter Project

## Contributors:
 - zachlysobey
 - KrishnaRSampath
 - mconklin
 - AmundsenJunior

## Project Description
This project will eventually let the end user type in a gitHub username
and find out if s/he is eligible to win a free T-shirt from Digital Ocean,
courtesy of their "Hacktoberfest" promotion.

### Current Status
The script currently works to count all PushEvents committed by a user (including pull requests that were successfully accepted). 

Known Issue: Github's "Public Activity" feed (which we assume Digital Ocean will look at to verify eligibility for the T-shirt) only counts commits to master branches of repos, not commits to isolated branches that never get merged in to the main repo. See, for example, the results for user mfishera100, who at the current time (8:24 pm on Friday October 17, 2014) has 38 Total Contributions, only 30 of which are commits that show up in the "Public Activity" feed. However, this user has a further 6 commits to branches that were never merged into the master branches of their respective repos. Should we count these?
