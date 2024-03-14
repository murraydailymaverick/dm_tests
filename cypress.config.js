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
      credentials: {
        username: "devautotest",
        password: "ZMk4pz2T2dmSgPF"
      },
      wp_credentials: {
        username: "ck_55e71f9d79f05f7142482820b183afbe8cc82804",
        password: "cs_fefabab1abc52d97d54b8ba7c05fb7935c63e5bd"
      },
      chromeWebSecurity: false,
      env: 'dev',
      authtoken: '5790d46a36af737f21da2ba60fb70d76b4a2547bb53310dd74dfaa0f894eef0d',
      notifyUrl: 'https://devautotest:ZMk4pz2T2dmSgPF@dev.dailymaverick.co.za',
      authUrl: 'https://devautotest:ZMk4pz2T2dmSgPF@dev.dailymaverick.co.za',
      baseUrl: 'https://dev.dailymaverick.co.za',
      insiderBlockUrl: 'https://dev.dailymaverick.co.za/insider/',
      loginUrl: 'https://dev.dailymaverick.co.za/sign-in/',
      dashboardUrl: 'https://dev.dailymaverick.co.za/wp-admin/',
      insiderUrl: 'https://dev.dailymaverick.co.za/insider/',
      newsletterUrl: 'https://dev.dailymaverick.co.za/about/newsletter/',
      localfolder: '',
      domain: 'dev.dailymaverick.co.za',
      //https://dev.dailymaverick.co.za/article/2022-07-04-walking-is-a-state-of-mind-it-can-teach-you-so-much-about-where-you-are/
      articleUrl: 'https://dev.dailymaverick.co.za/opinionista/2022-06-30-after-zondo-the-national-prosecuting-authority-dare-not-fail-the-nation/?nocache=1',

      articleTemplateNoAds: 'https://dev.dailymaverick.co.za/article/2023-08-23-brics-latest-bloc-agrees-rules-clearing-path-for-more-members/', //1818886

      articleTemplate1_old: 'https://dev.dailymaverick.co.za/article/2018-03-01-health-message-to-men-take-a-lesson-from-stephen-fry-and-get-tested-to-prevent-prostate-cancer/', //78503 oldest
      articleTemplate1: 'https://dev.dailymaverick.co.za/article/2023-08-24-north-korea-says-second-attempt-to-launch-spy-satellite-failed/', //1819116 //template-article-1-php

      articleTemplate2_old: 'https://dev.dailymaverick.co.za/article/2017-09-04-clever-investments-dont-require-high-management-fees-3/', //13680 oldest
      articleTemplate2: 'https://dev.dailymaverick.co.za/article/2023-08-24-august-by-elections-anc-da-record-ec-joburg-victories/', //1819299 //template-article-2-php

      singleOpinionPiece: 'https://dev.dailymaverick.co.za/opinionista/2023-08-24-we-stand-united-in-our-fight-against-russia-on-independence-day-in-ukraine/', //single-opinion-piece

      templateCartoonPage: 'https://dev.dailymaverick.co.za/zapiro/', //template-cartoon-page
      templateCartoonPage2: 'https://dev.dailymaverick.co.za/cartoon/about-time-2/', //template-cartoon-page

      elemetorUrl: 'https://dev.dailymaverick.co.za/article/2022-12-08-test-new-elemetor/',


      //summariesUrl: 'https://dev.dailymaverick.co.za/summaries/',
      summariesUrl: 'https://dev.dailymaverick.co.za/home-summaries/',

      summariesCount: 46,
      summariesText1: 'Ukraine war',
      summariesText2: 'Prigozhin',
      summariesText3: 'small-scale farmers',
      summariesUrlRedirect: 'https://dev.dailymaverick.co.za/article/2023-08-23-putin-fails-to-win-support-for-his-ukraine-war-narrative-from-fellow-bloc-leaders/?topreads=card&utm_source=socialshare&utm_medium=twitter',

      users: {
        admin: {
          adminLoginUrl: 'https://dev.dailymaverick.co.za/dm-admin/',
          username: 'mr_admin',
          email: 'murray+admin@dailymaverick.co.za',
          pw: 'uG*#)NapM^bdB*!E*Df(pOhk'
        },
        subscriber: {
          username: 'murraysubscriber',
          email: 'murray+subscriber@dailymaverick.co.za',
          _email: 'murray_subscriber@dailymaverick.co.za',
          pw: 'uG*#)NapM^bdB*!E*Df(pOhk',
          firstname: 'Subscriber',
          lastname: 'One',
          tel: '0727322817',
          IDNumber: '2001014800086',
        },
        insider: {
          id: 12433,
          token: 'MEdjczVNYUpZeFBuZmN2SkdvQUJXRURmdzlOelJlVW5mVDFZYzEwUHlCRTlmWUZHb0JFY0U5ZHBIZ1RKSkxyNVpKTEhPSFJBYk04bmo5RW93VXFCUE5sdyt3TXkzTnpWemNSSng5RFlNaGV5TTg1UnJmNnBBUlBSSVk3WjhhL0wwbzFUUUJ1ZXBnSVlabjQ3ZkFUcnR0MUhTaHV2VlhTZVloQzgzUkhWajFBPQ==',
          username: 'Insider',
          email: 'murray+insider@dailymaverick.co.za',
          _email: 'murray_insider@dailymaverick.co.za',
          pw: 'insiderpasswordok',
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
