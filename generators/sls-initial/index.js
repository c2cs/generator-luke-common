/**
 * This is a "partial" sub-generator that generates a very basic Vagrantfile
 * and provision configuration for the project.
 *
 * @example
 * shell> yo luke:vagrant
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @created 2016-12-14
 */
"use strict";

var baseGenerator = require( "../_BaseGenerator" );
var _ = require( "lodash" );
var path = require( "path" );

module.exports = baseGenerator.extend( {

	initializing : function() {
	},

	prompting : function() {

		// Locals
		var me = this;

		// Initialize the base generator
		me._initBase();

		// Show user prompts
		me._showPrompts(

			// Prompts from the base generator
			[ "projectName", "projectDesc" ],

			// Additional, custom, prompts
			[{
				type: "confirm",
				name: "needInitialOperation",
				message: "Do you want create initial operation config?",
				default: true,
				askAgain: false
			}, {
				// it could be when: answers => answers.needInitialOperation
				when        : function( answers ) {

					return answers.needInitialOperation;

				},
				type        : "input",
				name        : "operationId",
				message     : "Initial operation id",
				default     : "initOperation",
				cacheMode	: "prefer-cache",
				askAgain	: false
			}, {
				// it could be when: answers => answers.needInitialOperation
				when        : function( answers ) {

					return answers.needInitialOperation;

				},
				type        : "input",
				name        : "operationDescription",
				message     : "Initial operation description",
				default     : "Awesome operation",
				cacheMode	: "prefer-cache",
				askAgain	: false
			}, {
				// it could be when: answers => answers.needInitialOperation
				when        : function( answers ) {

					return answers.needInitialOperation;

				},
				type        : "list",
				choices     : ["get", "post", "patch", "put", "delete"],
				name        : "httpMethod",
				message     : "HTTP method",
				default     : 0,
				cacheMode	: "prefer-cache",
				askAgain	: false
			}, {
				// it could be when: answers => answers.needInitialOperation
				when        : function( answers ) {

					return answers.needInitialOperation;

				},
				type        : "input",
				name        : "httpPath",
				message     : "HTTP path",
				default     : "/Greetings",
				cacheMode	: "prefer-cache",
				askAgain	: false
			}],

			// Callback function
			me.async()

		);

	},

	_getServiceNames: function () {

		var me = this;

		if ( /^sls-service-/.test( me.props.parsedProject ) ) {

			return {
				parsed: me.props.parsedProject,
				full: me.props.projectName
			};

		}

		return {
			parsed: "sls-service-" + me.props.parsedProject,
			full: "SLS Service " + me.props.projectName
		};

	},

	writing : {

		createPartialFiles : function() {

			var me = this;
			var operationDir = me.props.httpMethod +
				_.upperFirst( me.props.operationId );
			var names = me._getServiceNames();

			// Static copy serverless.common.yml
			me.fs.copy( me.templatePath( "sls/endpoints/httpPath/" +
					"operationDir/index.js"),
				me.destinationPath( "endpoints" + me.props.httpPath +
					"/" + operationDir + "/index.js" ) );

			// Static copy sererless.common.yml
			me.fs.copy( me.templatePath( "sls/.sls/_serverless.common.yml" ),
				me.destinationPath( ".sls/serverless.common.yml" ) );

			// Dynamic copy serverless.yml
			me.fs.copyTpl( me.templatePath( "sls/_serverless.yml" ),
				me.destinationPath( "serverless.yml" ), {
					name : names.parsed,
					operationId: me.props.operationId,
					httpPath: me.props.httpPath,
					httpMethod: me.props.httpMethod,
					operationDir: operationDir
				} );

			// Dynamic copy serverless.yml
			me.fs.copyTpl( me.templatePath( "sls/_serverless.env.yml" ),
				me.destinationPath( "serverless.env.yml" ), {
					name : names.parsed
				} );

			// Dynamic copy projectConfig.json
			me.fs.copyTpl( me.templatePath( "sls/.sls/_projectConfig.json" ),
				me.destinationPath( ".sls/projectConfig.json" ), {
					name : names.full,
					description: me.props.projectDesc,
					httpPath: me.props.httpPath,
					httpMethod: me.props.httpMethod,
					operationDescription: me.props.operationDescription,
					operationId: me.props.operationId
				} );

			// Dynamic copy projectConfig.yml
			me.fs.copyTpl( me.templatePath( "sls/.sls/_projectConfig.yml" ),
				me.destinationPath( ".sls/projectConfig.yml" ), {
					name : names.full,
					description: me.props.projectDesc,
					httpPath: me.props.httpPath,
					httpMethod: me.props.httpMethod,
					operationDescription: me.props.operationDescription,
					operationId: me.props.operationId
				} );

			// Dynamic copy initial Handler.js
			me.fs.copyTpl( me.templatePath( "sls/endpoints/httpPath/" +
					"operationDir/Handler.js"),
				me.destinationPath( "endpoints" + me.props.httpPath +
					"/" + operationDir + "/Handler.js" ), {
					operationClass: _.upperFirst( me.props.operationId ),
					operationDescription: me.props.operationDescription
				} );

			// Dynamic copy test file
			me.fs.copyTpl( me.templatePath( "sls/tests/OperationTest.js" ),
				me.destinationPath( path.join( "tests",
					_.upperFirst( me.props.operationId ) + "Test.js" ) ), {
					httpPath: me.props.httpPath,
					operationDir: operationDir,
					operationId: me.props.operationId,
					operationClass: _.upperFirst( me.props.operationId ),
					operationDescription: me.props.operationDescription
				} );

			// Dynamic copy request.json
			me.fs.copyTpl( me.templatePath( "sls/endpoints/httpPath/" +
					"operationDir/schemas/request.json"),
				me.destinationPath( "endpoints" + me.props.httpPath +
					"/" + operationDir + "/schemas/request.json" ), {
					operationId: me.props.operationId
				} );

			// Dynamic copy request.json
			me.fs.copyTpl( me.templatePath( "sls/endpoints/httpPath/" +
					"operationDir/schemas/response.json"),
				me.destinationPath( "endpoints" + me.props.httpPath +
					"/" + operationDir + "/schemas/response.json" ), {
					operationId: me.props.operationId
				} );

		}
	}


} );
