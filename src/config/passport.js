const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const OAuth2Strategy = require('passport-oauth2').Strategy;
const axios = require('axios');
const env = require('./env');
const { User } = require('../models');

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
  callbackURL: env.GOOGLE_CALLBACK_URL,
  scope: ['profile', 'email']
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
  clientID: env.FACEBOOK_APP_ID,
  clientSecret: env.FACEBOOK_APP_SECRET,
  callbackURL: env.FACEBOOK_CALLBACK_URL,
  profileFields: ['id', 'displayName', 'emails', 'photos']
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: env.GITHUB_CLIENT_ID,
  clientSecret: env.GITHUB_CLIENT_SECRET,
  callbackURL: env.GITHUB_CALLBACK_URL,
  scope: ['user:email']
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));



module.exports = passport;

