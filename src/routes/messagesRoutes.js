import { Router } from 'express';
const router = new Router();

import { requireLoggedIn } from '../app/middleware/auth';
import MessagesCtrl from '../app/controllers/MessagesCtrl';

router.get('/', requireLoggedIn, MessagesCtrl.getMessagesPage);
router.get('/new', requireLoggedIn, MessagesCtrl.getNewMessagesPage);

export default router
