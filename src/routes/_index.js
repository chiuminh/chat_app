import postsApiRoute from './api/posts';
import userApiRoute from './api/users';
import homeRoute from './homeRoutes';
import profileRoute from './profileRoutes';
import searchRoute from './seachRoutes';
import messagesRoute from './messagesRoutes';

export default function (app) {
    app.use('/api/users', userApiRoute);
    app.use('/api/posts', postsApiRoute);

    app.use('/messages', messagesRoute);
    app.use('/profile', profileRoute);
    app.use('/search', searchRoute);
    app.use('/', homeRoute);
}
