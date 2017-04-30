/**
 * @generated
 */
"use strict";

module.exports.handler = function handler ( event, context, callback ) {

	const Handler = require( "./Handler" );

	let handler = new Handler( {} );

	return handler.execute( event, context, callback );

};
