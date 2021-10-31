class SearchCtrl {
    getSearchPage(req, res, next) {
        let payload = createPayload(req);
        res.render('main/search', payload);
    }

    getSearch(req, res, next) {
        let payload = createPayload(req);
        payload.selectedTab = req.params.selectedTab;

        res.render('main/search', payload);
    }
}

function createPayload(req) {
    let payload = {
        user: req.user,
        pageTitle: 'Search',
        userLoggedInJs: JSON.stringify({
            _id: req.user._id
        }),
        success: req.flash('success'),
        errors: req.flash('errors'),
    };
    return payload;
}
export default new SearchCtrl()
