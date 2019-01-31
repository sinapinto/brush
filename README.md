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

Overall, I'm super happy with using TypeScript.  Initially, I had reservations
about using it because this codebase is relatively small and I'm working on it
solo.  To my understanding, some of the biggest wins from TypeScript come when
using it in large scale, team projects. Nevertheless, I quickly felt a massive
benefit from introducing TypeScript to this project when it caught existing and
prevented newly added `TypeError`s from property access on nullable variables. I
feel that this alone contributes massively to writing code more confidently and
allows me to make larger changes at a time before saving and testing out your
changes.  That said, I definitely get a sense of how easily TypeScript can give
developers a false sense of security--it almost feels like unit tests aren't
even needed when you have type-checking (but they most definitely are).
Moreover, the developer experience TypeScript brings about makes it hard to go
back.  Automatic imports, intelligent autocompletion, and jumping to definition
are among my favorites.

Since this was my first project using TypeScript, the biggest drawback of using
it was the learning curve.  Despite this, it only took less than a day to
migrate the entire app from JavaScript to TypeScript (albeit littered with
`any`).  Another common criticism of TypeScript is the extra code noise and
friction that the type annotations add.  I think these are outweighed by the
benefits, from my experience.

### GraphQL

### CSS-in-JS

I like that it removes the class name mapping of element to style.  While
classNames can be a good source of documentation for an element, this can be
replaced by the component name.  For comparison:

```
<div className="profileContainer"> </div>

<ProfileContainer> </ProfileContainer>
```

I also found that type-checking can come in handy when interpolating JS
variables in your CSS.  Also, dead style elimination becomes trivial with
CSS-in-JS.

One benefit of using CSS files, though, is that hot-reloading CSS files is fast,
easy, and reliable.  The same can't be said about hot-reloading JS
unfortunately, which makes the feedback loop when tweaking styles a bit longer.

### React Hooks API

Hooks are really pushing the limit of writing concise, expressive code.  My only
gripe is that the debugging story is a subpar, but that is soon to change with
the work that's being done on React DevTools.

### React Suspense API

This is also awesome.  It's really refreshing to not see `isLoading` props
scattered throughout.  Also, the control over spinner duration that's available
once you flip React into concurrent mode is nice.  I also found that the
`<Suspense>` component synergizes nicely with `<ErrorBoundary>`s, as components
that have a loading spinner are often good candidates for having an error
boundary.

## To-do

- [ ] pagination
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
