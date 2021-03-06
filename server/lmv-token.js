//
// Copyright (c) Autodesk, Inc. All rights reserved 
//
// Node.js server workflow 
// by Cyrille Fauvel - Autodesk Developer Network (ADN)
// January 2015
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted, 
// provided that the above copyright notice appears in all copies and 
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting 
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS. 
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC. 
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
//
var express =require ('express') ;
var request =require ('request') ;
var unirest =require('unirest') ;
var credentials =require ('./credentials') ;

var router =express.Router () ;

router.get ('/token', function (req, res) {
	var creds =new credentials () ;
	var params ={
		client_id: req.params.key,
		client_secret: req.params.secret,
		grant_type: 'client_credentials'
	} ;
	unirest.post (creds.AuthenticateUrl)
		.header ('Accept', 'application/json')
		.type ('application/x-www-form-urlencoded')
		.send (params)
		.end (function (response) {
			if ( response.statusCode != 200 )
				return (res.status (500).end ()) ;
			res.json (response.body) ;
		})
	;
}) ;

router.post ('/token', function (req, res) {
	var creds =new credentials () ;
	var params ={
		client_id: req.body.key,
		client_secret: req.body.secret,
		grant_type: 'client_credentials'
	} ;
	unirest.post (creds.AuthenticateUrl)
		.header ('Accept', 'application/json')
		.type ('application/x-www-form-urlencoded')
		.send (params)
		.end (function (response) {
			if ( response.statusCode != 200 )
				return (res.status (500).end ()) ;
			res.json (response.body) ;
		})
	;
}) ;

module.exports =router ;
