// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const https = require("https");
const { URL } = require("url");

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
    require('@cypress/code-coverage/task')(on, config)

    on("task", {
        async waitForServerResponse({ server_url }) {
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            function makeRequest({ hostname, port, path }) {
                return new Promise((resolve, reject) => {
                    const options = {
                        hostname,
                        port,
                        path,
                        body: {},
                        method: 'POST'
                    }
                    const req = https.request(options, response => {
                        response.on('data', d => {
                            resolve(d.toString());
                        });
                    });
                    req.on('error', error => {
                        reject(error);
                    });

                    req.end();
                });
            }
            async function recursiveGet(retry = 1) {
                try {
                    const res = await makeRequest({ hostname, port, path });
                    if (res?.code?.includes("ECONNREFUSED") || res?.code?.includes("ECONNRESET")) {
                        await sleep(1000);
                        await recursiveGet(retry + 1);
                    }
                }
                catch(error) {
                    if (error?.code?.includes("ECONNREFUSED") || error?.code?.includes("ECONNRESET")) {
                        await sleep(1000);
                        await recursiveGet(retry + 1);
                    }
                }
            }
            if (!server_url) {
                server_url = config.baseUrl;
            }
            const parsedUrl = new URL(server_url);

            const hostname = parsedUrl?.hostname ?? "localhost";
            const port = parsedUrl?.port ?? 443;
            const path = parsedUrl?.pathname ?? "/";
            return new Promise(async (resolve, reject) => {
                // tasks should not resolve with undefined
                setTimeout(() => reject(new Error("Timeout")), 60000);
                await recursiveGet();
                resolve(true);
            });
        }
    });

    return config;
};
