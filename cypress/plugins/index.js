/// <reference types="cypress" />
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

const { loadFixture } = require("../../util/prisma-loader");

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("task", {
    async prismaLoader(fixtureFile) {
      const file = `${config.fixturesFolder}/${fixtureFile}`;
      await loadFixture(file);
      return null;
    },
  });

  require("cypress-image-snapshot/plugin").addMatchImageSnapshotPlugin(
    on,
    config
  );
  // return config;
};
