class HomeCtrl {
  getHomePage(req, res) {
    res.render('main/home', {
      user: req.user,
      userLoggedInJs: JSON.stringify({ _id: req.user._id }),
      pageTitle: 'Home',
      success: req.flash('success'),
      errors: req.flash('errors'),
    })
  }

  getSearchPage(req, res, next) {
    res.render('main/search', {
      user: req.user,
      pageTitle: 'Search',
      success: req.flash('success'),
      errors: req.flash('errors'),
    })
  }
}
export default new HomeCtrl()
