# gitHub 2014 Hacktoberfest Counter Project

## Contributors:
 - zachlysobey
 - KrishnaRSampath
 - mconklin
 - AmundsenJunior
 -patrick1378

## 2015 Event

Digital Ocean has announced [a new (2015) promotion](https://github.com/blog/2067-hacktoberfest-contribute-to-open-source-in-october)

From that post:

> Here's everything you need to do to get your free, limited edition Hacktoberfest t-shirt:

> 1) Sign up on the Hacktoberfest website right away

> 2) Open at least four pull requests on any GitHub-hosted open source project(s) by October 31st, 2015

> 3) After the month is over, DigitalOcean will collect your shipping details and mail your shirt

These new requirements render this project __obsolete__.

For the 2015 hacktoberfest use the following verification tool to see if you have enough PR's;

http://hf.heidilabs.com/#

### Current Status
This project let the end user type in a gitHub username
and find out if s/he is eligible to win a free T-shirt from Digital Ocean,
courtesy of their 2014 "Hacktoberfest" promotion.

The script currently works to count all PushEvents committed by a user (including pull requests that were successfully accepted). 

Known Issue: Github's "Public Activity" feed (which we assume Digital Ocean will look at to verify eligibility for the T-shirt) only counts commits to master branches of repos, not commits to isolated branches that never get merged in to the main repo. See, for example, the results for user mfishera100, who at the current time (8:24 pm on Friday October 17, 2014) has 38 Total Contributions, only 30 of which are commits that show up in the "Public Activity" feed. However, this user has a further 6 commits to branches that were never merged into the master branches of their respective repos. Should we count these?
