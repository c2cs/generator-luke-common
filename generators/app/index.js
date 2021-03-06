/**
 * This is a "project scaffold" sub-generator that generates a minimal project
 * scaffold that should be useful as a starting point for most of my projects.
 * This scaffold/generator is also the default generator and will execute if
 * no sub-generator is specified.
 *
 * @example
 * shell> npm install -g yo generator-luke
 * shell> mkdir my-project
 * shell> cd my-project
 * shell> yo luke
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @created 2016-12-14
 */

var yeoman = require( "yeoman-generator" );

module.exports = yeoman.Base.extend({

	initializing : function() {

		// Locals
		var me = this;

		// Compose
		me.composeWith("luke:package");
		me.composeWith("luke:mit-license");
		me.composeWith("luke:readme");
		me.composeWith("luke:git");
		me.composeWith("luke:editor");
		me.composeWith("luke:scripts");
		me.composeWith("luke:vagrant");

	},

	configuring: function() {
		this.log(" ");
	}

});
