import { Router } from 'express'
const router = new Router()

import UserCtrl from '../app/controllers/UserCtrl'
import AuthCtrl from '../app/controllers/AuthCtrl'
import HomeCtrl from '../app/controllers/HomeCtrl'
import initPassportLocal from '../app/controllers/passport/local'
import * as auth from '../app/middleware/auth'
import passport from 'passport'
import initPassportFacebook from '../app/controllers/passport/facebook'
import initPassportGoogle from '../app/controllers/passport/google'
import SearchCtrl from '../app/controllers/SearchCtrl'

// init all passport
initPassportLocal()
initPassportFacebook()
initPassportGoogle()

// Login with google
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
)
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/')
  }
)

// Login with facebook
router.get(
  '/auth/facebook',
  passport.authenticate('facebook', {
    scope: ['email'],
    successFlash: true,
    failureFlash: true,
  })
)
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
)

// Login with local
router
  .route('/login')
  .get(auth.requireLoggedOut, AuthCtrl.getLoginPage)
  .post(
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      successFlash: true,
      failureFlash: true,
    })
  )

// [GET] /logout
router.get('/logout', AuthCtrl.logout)

// [GET] /verify/:token
router.get('/verify/:token', AuthCtrl.verifyToken)

// [GET/POST] /register
router
  .route('/register')
  .get(auth.requireLoggedOut, AuthCtrl.getRegister)
  .post(AuthCtrl.postRegister)

// [GET/POST] /forgot-password
router
  .route('/forgot-password')
  .get(auth.requireLoggedOut, UserCtrl.getForgotPasswordPage)
  .post(UserCtrl.postForgotPassword)

// [GET/POST] /reset-password/:id/:token
router
  .route('/reset-password/:id/:token')
  .get(UserCtrl.getResetPasswordPage)
  .post(UserCtrl.resetPassword)

router.get('/', auth.requireLoggedIn, HomeCtrl.getHomePage)

export default router
