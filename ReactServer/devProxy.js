// Proxy with Express and Parcel
const Bundler = require('parcel-bundler');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
// Paths to forward to the app server
const forward = ['/info', '/activities', '/activities/:id', '/login', '/logout',
    '/members', '/members/:id', '/applicants'];
app.use(forward, createProxyMiddleware({ target: 'http://127.0.0.1:3039' }));
// Instance of the parcel.js bundler with start file
const bundler = new Bundler('./index.html');
app.use(bundler.middleware());
app.listen(1234);