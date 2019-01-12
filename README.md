# brush

A social blogging website geared for journaling and sharing learnings during
interview preparation.

The motivation for building this comes from a chinese forum called 1point3acres,
dedicated to discussing all things related to landing a job at a top tech
company, from the immigration process to salary negotiation.  The website has a
[subforum named
刷题](https://translate.googleusercontent.com/translate_c?depth=1&hl=en&rurl=translate.google.com&sl=zh-CN&sp=nmt4&tl=en&u=https://www.1point3acres.com/bbs/forum-84-1.html&xid=17259,15700021,15700124,15700149,15700186,15700190,15700201&usg=ALkJrhjuwoGcNqXDYX9BlBbkZaKRz3R4Ew)
which translates in english to "brush problem", where people will state their
goals (e.g. "brush" 3 problems a day) and update the thread with their daily
achievements and sometimes also notes about the problems.  Others will chime in
with words of encouragement and help keep the "landlord" (thread author)
accountable.

I think participating in this sort of community can be incredibly valuable for
those of us on the interview preparation grind, but A) I don't know chinese, and
B) a bulletin board is not the best format for this kind of community.  So i set
out to build something better for myself and hopefully others.


## Installation

The app is already deployed, but I'm keeping the URL secret until i've done a
more thorough security audit.  In the meantime, if you're curious and would like
to run it locally, it's pretty straightforward.

1. Install and run redis
1. Install and run PostgreSQL (and create a database)
1. Clone this repository
1. Run `cp .example.env .env`
1. Update `.env` with your PostgreSQL username/password and database name, as
   well as a random `SESSION_SECRET` which gets used to sign cookies
1. Run `npm install` (tested on node 8.7.0 and npm 6.5.0)
1. Run `npm run dev:web` to spin up the webpack dev server
1. Run `npm run dev:api` to spin up the nodejs API server
1. The app should now be running on `http://localhost:3000`


## Tech

Some pretty cool tech is being used, which make it generally a joy to develop on
(to me at least):

  * TypeScript
  * GraphQL (Apollo)
  * CSS-in-JS (styled-components)
  * React Hooks API
  * React Suspense API

I'll go over some of the tradeoffs i've found so far for each.

### TypeScript

### GraphQL

### CSS-in-JS

### React Hooks API

### React Suspense API

## To-do

- [ ] pagination
- [ ] edit post
- [ ] feed
- [ ] comments
- [ ] profile image upload
- [ ] search suggestions

## Attribution

### Font Awesome

License	[CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)

[Project](https://fontawesome.com/)

### Material Design icons

License	[Apache License Version 2.0](https://github.com/google/material-design-icons/blob/master/LICENSE)

[Project](http://google.github.io/material-design-icons/)
