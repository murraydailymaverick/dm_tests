const { defineConfig } = require('cypress')

module.exports = defineConfig({
  apiKey: 'Iixw1010v8tDgylEjq03GWe15TLRxWv5HGoJ6TvsyeehY110',
  fixturesFolder: false,
  video: false,
  chromeWebSecurity: false,
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
      chromeWebSecurity: false,
      env: 'dev',
      baseUrl: 'https://dev.dailymaverick.co.za',
      loginUrl: 'https://dev.dailymaverick.co.za/sign-in/',
      dashboardUrl: 'https://dev.dailymaverick.co.za/wp-admin/',
      insiderUrl: 'https://dev.dailymaverick.co.za/insider/',
      localfolder: '',
      domain: 'dev.dailymaverick.co.za',
      //https://dev.dailymaverick.co.za/article/2022-07-04-walking-is-a-state-of-mind-it-can-teach-you-so-much-about-where-you-are/
      articleUrl: 'https://dev.dailymaverick.co.za/opinionista/2022-06-30-after-zondo-the-national-prosecuting-authority-dare-not-fail-the-nation/?nocache=1',
      elemetorUrl: 'https://dev.dailymaverick.co.za/article/2022-12-08-test-new-elemetor/',
      users: {
        admin: {
          adminLoginUrl: 'https://dev.dailymaverick.co.za/dm-admin/',
          username: 'mr_admin',
          email: 'murray+admin@dailymaverick.co.za',
          pw: 'uG*#)NapM^bdB*!E*Df(pOhk'
        },
        subscriber: {
          username: 'mr_subscriber',
          email: 'mr_subscriber@dailymaverick.co.za',
          pw: 'uG*#)NapM^bdB*!E*Df(pOhk',
          firstname: 'Subscriber',
          lastname: 'One'
        },
        insider1: {
          id: 12433,
          token: 'MEdjczVNYUpZeFBuZmN2SkdvQUJXRURmdzlOelJlVW5mVDFZYzEwUHlCRTlmWUZHb0JFY0U5ZHBIZ1RKSkxyNVpKTEhPSFJBYk04bmo5RW93VXFCUE5sdyt3TXkzTnpWemNSSng5RFlNaGV5TTg1UnJmNnBBUlBSSVk3WjhhL0wwbzFUUUJ1ZXBnSVlabjQ3ZkFUcnR0MUhTaHV2VlhTZVloQzgzUkhWajFBPQ==',
          username: 'mr_insider1',
          email: 'murray+insider1@dailymaverick.co.za',
          pw: 'uG*#)NapM^bdB*!E*Df(pOhk',
          salutation: 'Mr',
          firstname: 'Insider',
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
          id: 12434,
          token: 'MEdjczVNYUpZeFBuZmN2SkdvQUJXRURmdzlOelJlVW5mVDFZYzEwUHlCRTlmWUZHb0JFY0U5ZHBIZ1RKSkxyNVpKTEhPSFJBYk04bmo5RW93VXFCUE5sdyt3TXkzTnpWemNSSng5RFlNaGV5TTg1UnJmNnBBUlBSSVk3WjhhL0wwbzFUUUJ1ZXBnSVlabjQ3ZkFUcnR0MUhTaHV2VlhTZVloQzgzUkhWajFBPQ==',
          username: 'mr_insider2',
          email: 'murray+insider2@dailymaverick.co.za',
          pw: 'uG*#)NapM^bdB*!E*Df(pOhk',
          salutation: 'Mr',
          firstname: 'Insider',
          lastname: 'Two',
          middlename: 'Dorris',
          knownas: 'Bert',
          first_language: 'English',
          tel: '0727322817',
          residential_address: '34 Eagles Crag',
          residential_suburb: 'Lone Hill',
          residential_city: 'Johannesburg',
          residential_province: 'Gauteng',
          residential_country: 'South Africa',
          residential_code: '2191',
          occupation: 'Software Engineer'
        },
        insider3: {
          username: 'mr_insider3',
          email: 'murray+insider3@dailymaverick.co.za',
          pw: 'uG*#)NapM^bdB*!E*Df(pOhk',
          salutation: 'Mr',
          firstname: 'Insider',
          lastname: 'Three'
        }
      }
    },
  },
})

//require('@applitools/eyes-cypress')(module)
