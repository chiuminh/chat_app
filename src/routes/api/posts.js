import { transErrors } from '../../../lang/vi'
import { Router } from 'express'
const router = new Router()
import { requireLoggedIn } from '../../app/middleware/auth'
import { validate, postSchema } from '../../validate'
import Post from '../../app/models/Post'
import User from '../../app/models/User'

// [PUT] api/posts/:id/like
router.put('/:id/like', requireLoggedIn, async (req, res) => {
  try {
    const postId = req.params.id
    const userId = req.user._id
    let isLiked = req.user.likes && req.user.likes.includes(postId)
    let option = isLiked ? '$pull' : '$addToSet'

    // Insert user like
    await User.findByUserIdAndUpdate(userId, {
      [option]: { likes: postId },
    })

    // Insert post like
    const post = await Post.findPostByIdAndUpdate(postId, {
      [option]: { likes: userId },
    })
    return res.status(201).json({ post })
  } catch (error) {
    console.log({ error })
    res.status(400).json({ message: transErrors.server_error })
  }
})

// [PUT] api/posts/:id/retweet
router.post('/:id/retweet', requireLoggedIn, async (req, res) => {
  try {
    const postId = req.params.id
    const userId = req.user._id

    // Try and delete retweet
    let deletedPost = await Post.findAndDelete({
      postedBy: userId,
      retweetData: postId,
    })

    let option = deletedPost ? '$pull' : '$addToSet'
    let repost = deletedPost

    if (!repost) {
      repost = await Post.createNew({ postedBy: userId, retweetData: postId })
    }

    // Insert user retweet
    req.user = await User.findByUserIdAndUpdate(userId, {
      [option]: { retweets: repost._id },
    })

    // Insert post retweet
    let post = await Post.findPostByIdAndUpdate(postId, {
      [option]: { retweetUsers: userId },
    })
    post = await User.getUserRef(post, 'postedBy')
    return res.status(201).json({ post })
  } catch (error) {
    console.log({ error })
    res.status(400).json({ message: transErrors.server_error })
  }
})

// [GET] [POST] [DELETE] [PUT] api/posts/:id
router
  .route('/:id')
  .get(requireLoggedIn, async (req, res) => {
    try {
      let posts = await Post.findPosts({ _id: req.params.id })
      posts = await User.getUserRef(posts, 'retweetData.postedBy')

      return res.status(201).json({ post: posts[0] })
    } catch (error) {
      console.log({ error })
      res.status(400).json({ message: transErrors.server_error })
    }
  })
  .post(requireLoggedIn, async (req, res) => {
    //  validate data
    const { error } = validate(req.body, postSchema)
    if (error) {
      res.status(401).json({ message: error.details[0].message })
      return
    }

    const postItem = {
      content: req.body.content,
      postedBy: req.user._id,
    }

    try {
      let newPost = await Post.createNew(postItem)
      newPost = await User.getUserRef(newPost, 'postedBy')
      res.status(201).json({ post: newPost })
    } catch (error) {
      console.log({ errorPost: error })
      res.status(400).json({ message: transErrors.server_error })
    }
  })
  .delete(requireLoggedIn, async (req, res) => {
    try {
      const deletedPost = await Post.findPostByIdAndDelete(req.params.id)
      if (!deletedPost) {
        return res.status(404).json({ message: transErrors.post_not_found })
      }
      return res.status(201).json({ deletedPost })
    } catch (error) {
      console.log({ errorDeletePostId: error })
      return res.status(404).json({ message: transErrors.server_error })
    }
  })
  .put(requireLoggedIn, async (req, res) => {
    try {
      if (req.body.pinned) {
        await Post.updateMany({ postedBy: req.user._id }, { pinned: false })
      }
      await Post.findPostByIdAndUpdate(req.params.id, req.body)
      console.log('success')
      return res.status(200).json({ success: true })
    } catch (error) {
      console.log({ errorPinPostId: error })
      return res.status(404).json({ message: transErrors.server_error })
    }
  })

// [GET] [POST] api/posts/
router
  .route('/')
  .get(requireLoggedIn, async (req, res) => {
    try {
      let searchObj = req.query
      if (searchObj.isReply !== undefined) {
        let isReply = searchObj.isReply == 'true'
        searchObj['replyTo'] = { $exists: isReply }
        delete searchObj.isReply
      }

      if (searchObj.followingOnly !== undefined) {
        let followingOnly = searchObj.followingOnly == 'true'

        if (followingOnly) {
          let objectIds = []

          if (!req.user.following) {
            req.user.following = []
          }
          req.user.following.forEach(user => objectIds.push(user))
          objectIds.push(req.user._id)

          searchObj.postedBy = { $in: objectIds }
        }

        delete searchObj.followingOnly
      }

      let posts = await Post.findPosts(searchObj)
      posts = await User.getUserRef(posts, 'replyTo.postedBy')
      posts = await User.getUserRef(posts, 'retweetData.postedBy')
      return res.status(201).json({ posts })
    } catch (error) {
      console.log({ error })
      res.status(400).json({ message: transErrors.server_error })
    }
  })
  .post(requireLoggedIn, async (req, res) => {
    //  validate data
    const { error } = validate(req.body, postSchema)
    if (error) {
      res.status(401).json({ message: error.details[0].message })
      return
    }

    let postItem = {
      content: req.body.content,
      postedBy: req.user._id,
    }

    if (req.body.replyTo) {
      postItem['replyTo'] = req.body.replyTo
    }

    try {
      let newPost = await Post.createNew(postItem)
      newPost = await User.getUserRef(newPost, 'postedBy')
      res.status(201).json({ post: newPost })
    } catch (error) {
      console.log({ errorPost: error })
      res.status(400).json({ message: transErrors.server_error })
    }
  })

export default router
