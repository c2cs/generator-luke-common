/**
 * This is a "project scaffold" sub-generator that generates a minimal project
 * scaffold for starting serverless service.
 *
 * @example
 * shell> npm install -g yo generator-luke
 * shell> mkdir my-sls-projectn
 * shell> cd my-sls-project
 * shell> yo luke:sls
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @created 2016-12-14
 */

var yeoman = require( "yeoman-generator" );

module.exports = yeoman.Base.extend( {

	initializing : function() {

		// Locals
		var me = this;

		// Compose
		me.composeWith( "luke:vagrant-sls" );
		me.composeWith( "luke:package-sls" );
		me.composeWith( "luke:sls-initial" );
		me.composeWith( "luke:package" );
		me.composeWith( "luke:mit-license" );
		me.composeWith( "luke:readme" );
		me.composeWith( "luke:git" );
		me.composeWith( "luke:editor" );
		me.composeWith( "luke:scripts" );

	},

	configuring: function () {

		this.log( " " );

	}

} );
