/**
 * This is a "partial" sub-generator that adds some dependencies to generation
 * real package.js and composes with it
 *
 * @example
 * shell> yo luke:package-sls
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @created 2017-03-15
 */

var yeoman = require( "yeoman-generator" );
var baseGenerator = require("../_BaseGenerator");

module.exports = baseGenerator.extend(
	{
		prompting: function() {

			// Locals
			var me = this;

			// Initialize the base generator
			me._initBase();

		},
		initializing : function() {

			// Locals
			var me = this;

			// Add sls required dependencies
			me._createSharedObject(
				"npm-dependency", "sls-tools", {
					module: "@c2cs/sls-tools",
					version: "^0.2.1"
				}
			);
			me._createSharedObject(
				"npm-dependency", "bluebird", {
					module: "bluebird",
					version: "^3.3.5"
				}
			);

			// Add tests required dependencies
			me._createSharedObject( "npm-dev-dependency", "test-helper", {
				module: "@c2cs/test-helper",
				version: "^0.2.1"
			} );
			me._createSharedObject( "npm-dev-dependency", "tv4", {
				module: "tv4",
				version: "^1.2.7"
			} );

			// Add sls required dev-dependencies
			me._createSharedObject( "npm-dev-dependency", "apigateway plugin", {
				module: "@c2cs/@c2cs/serverless-apigateway-plugin",
				version: "^0.2.9"
			} );
			me._createSharedObject( "npm-dev-dependency", "subscriptions", {
				module: "@c2cs/serverless-subscription-plugin",
				version: "latest"
			} );
			me._createSharedObject( "npm-dev-dependency", "offline plugin", {
				module: "serverless-offline",
				version: "^3.14.2"
			} );

			// Compose
			me.composeWith( "luke:package" );

		}

	}
);
