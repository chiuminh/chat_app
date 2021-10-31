
class SearchCtrl {
    getMessagesPage(req, res, next) {
        res.render('main/inbox_page', {
            pageTitle: 'Inbox',
            user: req.user,
            userLoggedInJs: JSON.stringify({
                _id: req.user._id
            }),
        });
    }

    getNewMessagesPage(req, res, next) {
        res.render('main/new_message', {
            pageTitle: 'New message',
            user: req.user,
            userLoggedInJs: JSON.stringify({
                _id: req.user._id
            }),
        });
    }

}

export default new SearchCtrl()
