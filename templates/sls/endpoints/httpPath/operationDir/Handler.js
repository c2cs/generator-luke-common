/**
 * <%= operationDescription %>
 * @author <email> <name>
 */
"use strict";

// Promises realization. Much more optimized than ES6 promises
const Promise = require( "bluebird" );

// Superclass for all MSA endpoints
const SessionEndpoint = require( "@c2cs/sls-tools/lib/SessionEndpoint" );

/**
 * @class <%= operationClass %>
 *
 */
class <%= operationClass %> extends SessionEndpoint {

	/**
	 * Entry point
	 *
	 * @param {<%= operationClass %>Request} event request data
	 *
	 * @returns {Promise} promise
	 */
	handle ( event ) {

		this.logger.info( "default.action", "Test log", event );

		return Promise.resolve( {} );

	}

	/**
	 * Constructor of GetHello
	 *
	 * @param {Object} [info] constructor data
	 * @param {Object} [info.deps] dependencies list
	 *
	 * @constructor
	 */
	constructor ( info ) {

		super( Object.assign( {
			requestSchema: require( "./schemas/request.json" ),
			responseSchema: undefined,
			responseId: undefined,
			responseType: undefined
		}, info ) );

		// Force initialize required params
		info = info || {};
		info.deps = info.deps || {};

		// Template for dependencies
		this.deps = Object.assign( {}, this.deps, {

			// Add your dependencies here.
		} );

	}

}

module.exports = <%= operationClass %>;
