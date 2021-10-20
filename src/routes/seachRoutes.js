import { Router } from 'express'
const router = new Router()

import { requireLoggedIn } from '../app/middleware/auth'
import SearchCtrl from '../app/controllers/SearchCtrl'

router.get('/', requireLoggedIn, SearchCtrl.getSearchPage)
router.get('/:selectedTab', requireLoggedIn, SearchCtrl.getSearch)

export default router
