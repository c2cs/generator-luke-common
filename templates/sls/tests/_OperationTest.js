/**
 * @author <email> <name>
 */
"use strict";

const assert = require( "assert" );
const path = require( "path" );
const sourcesPath = path.join( "../endpoints",
  "<%=httpPath %>", "<%= operationDir %>/" );
const <%= operationClass %> =
	require( path.join( sourcesPath, "Handler" ) );
const mockSLSTools = require( "@c2cs/sls-tools/mock" );

/** @type <%= operationClass %> */
let <%= operationId %>;

describe( "<%= operationClass %> tests", function <%= operationId %>Tests () {

	beforeEach( function fixture () {

		<%= operationId %> = new <%= operationClass %>( mockSLSTools( {
			Logger: {
				type: "Logger"
			}
		} ) );

	} );

	it( "should return successful response", function testHandler () {

		return <%= operationId %>.handle( {} ).then(

			function resultHandler ( data ) {

				assert.deepEqual( data, {} );

			}
		);

	} );

	it( "should return error response", function testHandler ( done ) {

		return Promise.resolve().then( function invokeHandle () {

			return <%= operationId %>.handle();

		} ).then( function successHandler () {

			throw new Error( "Should never gets here" );

		} ).catch(

			function errorHandler ( err ) {

				assert( err instanceof Error );
				assert.equal( err.message, "Missed event" );
				assert.equal( err.name, "InternalServerError" );
				assert.equal( err.status, 500 );

			}
		);

	} );

} );
