const { defineConfig } = require('cypress')

module.exports = defineConfig({
  fixturesFolder: false,
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      on('task', {
        setToken: (val) => { return (token = val); },
        getToken: () => { return token; }
      })
    },
    env: {
      env: 'dev',
      baseUrl: 'https://dev.dailymaverick.co.za/',
      loginUrl: 'https://dev.dailymaverick.co.za/sign-in/',
      dashboardUrl: 'https://dev.dailymaverick.co.za/wp-admin/',
      localfolder: '',
      domain: 'dev.dailymaverick.co.za',
      users: {
        admin: {
          adminLoginUrl: 'https://dev.dailymaverick.co.za/dm-admin/',
          username: process.env.USERNAME+'_admin',
          email: process.env.USERNAME+'+admin@dailymaverick.co.za',
          pw: process.env.USER_PASSWORD
        },
        subscriber: {
          username: process.env.USERNAME+'_subscriber',
          email: process.env.USERNAME+'+subscriber@dailymaverick.co.za',
          pw: process.env.USER_PASSWORD
        },
        insider1: {
          username: 'mr_insider1',
          email: process.env.USERNAME+'+insider1@dailymaverick.co.za',
          pw: process.env.USER_PASSWORD,
          salutation: 'Mr',
          firstname: process.env.USERNAME+'_Insider',
          middlename: 'Dorris',
          knownas: 'Bert',
          first_language: 'English',
          lastname: 'One',
          tel: '0727322817',
          residential_address: '34 Eagles Crag',
          residential_suburb: 'Lone Hill',
          residential_city: 'Johannesburg',
          residential_province: 'Gauteng',
          residential_country: 'South Africa',
          residential_code: '2191',
          occupation: 'Software Engineer'
        },
        insider2: {
          username: 'mr_insider2',
          email: process.env.USERNAME+'+insider2@dailymaverick.co.za',
          pw: process.env.USER_PASSWORD,
          salutation: 'Mr',
          firstname: process.env.USERNAME+'_Insider',
          lastname: 'Two'
        },
        insider3: {
          username: 'mr_insider3',
          email: process.env.USERNAME+'+insider3@dailymaverick.co.za',
          pw: process.env.USER_PASSWORD,
          salutation: 'Mr',
          firstname: process.env.USERNAME+'_Insider',
          lastname: 'Three'
        }
      }
    },
  },
})

require('@applitools/eyes-cypress')(module)
