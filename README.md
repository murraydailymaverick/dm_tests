# dm_tests
a repo to hold the DM tests.
Testing Websites – The Best Devices and Browsers
https://weareama.com/testing-websites-best-devices-browsers/

## npm
`cd wp-content`
`npm install`

##Use env encrypted secrets & config
https://docs.github.com/en/actions/security-guides/encrypted-secrets
https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsenv
To set up I used this example : https://applitools.com/blog/link-github-actions/

Take a copy of the env vars in cypress.config.js and create a corresponding json file to adjust for the local env
`touch cypress.internal.config.js`

##Cypress 
the configuration fie is for the git hub actions using secrets
`$(npm bin)/cypress open` or `npx cypress open` and test as per https://docs.cypress.io/guides/end-to-end-testing/testing-your-app
Pointing to a different configuration file `$(npm bin)/cypress open --config-file dev.cypress.config.js`
Pointing to a different configuration file `$(npm bin)/cypress open --config-file local.cypress.config.js`
E2E and chrome


## Useful links :
* https://www.stevenhicks.me/blog/2020/02/working-with-variables-in-cypress-tests/
* https://filiphric.com/switch-between-environments-in-cypress



config files can we found here: https://drive.google.com/drive/folders/1SxmL6_x5IvZfCJveh75JTFy5kpe8Y6Xl?usp=sharing

Take a copy of the env vars in cypress.config.js and create a corresponding json file to adjust for the local env
`touch internal.cypress.config.js`

`$(npm bin)/cypress open` and test as per https://docs.cypress.io/guides/end-to-end-testing/testing-your-app
Pointing to a different configuration file `$(npm bin)/cypress open --config-file cypress.internal.config.js`
E2E and chrome


## Applitools Example: Cypress JavaScript with the Ultrafast Grid

This is the example project for the [Cypress JavaScript tutorial](https://applitools.com/tutorials/cypress.html).
It shows how to start automating visual tests
with [Applitools Eyes](https://applitools.com/platform/eyes/)
and the [Ultrafast Grid](https://applitools.com/platform/ultrafast-grid/)
using [Cypress](https://www.cypress.io/) in JavaScript.

It uses:

* [JavaScript](https://www.javascript.com/) as the programming language
* [Cypress 10](https://www.cypress.io/) for browser automation
* [Google Chrome](https://www.google.com/chrome/downloads/) as the local browser for testing
* [npm](https://www.npmjs.com/) for dependency management
* [Applitools Eyes](https://applitools.com/platform/eyes/) for visual testing
* [Applitools Ultrafast Grid](https://applitools.com/platform/ultrafast-grid/) for cross-browser execution

To run this example project, you'll need:

1. An [Applitools account](https://auth.applitools.com/users/register), which you can register for free
2. [Node.js](https://nodejs.org/en/download/) version 16 or higher
3. A good JavaScript editor like [Visual Studio Code](https://code.visualstudio.com/docs/languages/javascript)
4. Up-to-date versions of the following browsers:
    * [Google Chrome](https://www.google.com/chrome/)
    * [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new/)
    * [Microsoft Edge](https://www.microsoft.com/en-us/edge)

To install project dependencies and set up Applitools Eyes, run:

```
npm install
npx eyes-setup
```

The Applitools config file is [`applitools.config.js`](applitools.config.js).
To execute tests, set the `APPLITOOLS_API_KEY` environment variable
to your [account's API key](https://applitools.com/tutorials/getting-started/setting-up-your-environment.html).

Then, to open the Cypress window for launching tests, run:

```
npx cypress open
```

If you want to run tests directly from the command line, run this instead:

```
npx cypress run
```

**For full instructions on running this project, take our
[Cypress JavaScript tutorial](https://applitools.com/tutorials/cypress.html)!**
