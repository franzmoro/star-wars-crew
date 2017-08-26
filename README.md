# THIN MARTIAN SELECTION EXERCISE
## Dev Setup
- Optionally get **Yarn** [here](https://yarnpkg.com/en/docs/install) if not already installed on your machine. `npm` will also work, but `yarn` is much faster.
- run `yarn` or `npm i` to install `node_modules`
- tests to be run with `yarn test` or `npm test`
- run in dev mode with `yarn dev` or `npm run dev`
- build for production with `yarn build` or `npm build`

## Technical Choices
- Frontend framework: **React**
- State management: **Redux**
- Build tool: **Webpack 2**
- Tests: **Jest**
- Linter: **Eslint**

#### Star Wars API
The SW api sets results by pages, but does not allow sorted results by query. Since there are only 87 results for people, requests for people are made recursively until there are no people left. All people are loaded in the redux state, to allow for later sorting by the user.

#### Styling
Due to time constrains and webpack configuration time, [React Bootstrap]() and component styling has been preferred over SASS / stylesheets.
Moreover, it was too enticing not to use [this hyperspace effect](https://codepen.io/noahblon/pen/GKflw), which I took the liberty to copy.

#### Other Notes
With more time, the favourites list could have been persisted to local storage.

## Original Exercise Instructions
Build a simple react app which displays a list of people from the [Star Wars API](https://swapi.co/documentation).

**The app should**:
- Render any number of people into a table
- The table should be sortable (ascending or descending) by some dimension of the data (date, name, whatever you like)
- Should be possible to click on a person and see more details
- Should be possible to save people to a ‘favourites’ list
- Be laid out nicely
- Preferrably built in React, but state can be managed in any way.
