import { transErrors, tranSuccess } from '../../../lang/vi'
import { Router } from 'express'
import User from '../../app/models/User'
import multer from 'multer'
import fsExtra from 'fs-extra'

const router = new Router()

// Get users
// [PUT] api/users/:userId/follow
router.get('/', async (req, res) => {
  let { keyword } = req.query
  let users = await User.find({
    $or: [
      { firstname: { $regex: new RegExp(keyword, 'i') } },
      { lastname: { $regex: new RegExp(keyword, 'i') } },
    ],
  })
  res.status(200).send({
    success: true,
    data: users,
  })
})

// Add or remove follow
// [PUT] api/users/:userId/follow
router.put('/:userId/follow', async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.findUserNormalById({ _id: userId })
    if (!user)
      return res.status(404).json({ message: transErrors.user_not_found })

    let isFollowing = user.followers && user.followers.includes(req.user._id)
    let option = isFollowing ? '$pull' : '$addToSet'

    // Add user or remove user to following of current user
    req.user = await User.findByUserIdAndUpdate(req.user._id, {
      [option]: { following: userId },
    })

    // Add user or remove user to follwers of userId
    await User.findByUserIdAndUpdate(userId, {
      [option]: { followers: req.user._id },
    })

    return res.status(200).json({ user: req.user })
  } catch (error) {
    console.log({ error })
    res.status(404).json({ message: error.message })
  }
})

// Show all followers
// [GET] api/users/:userId/followers
router.get('/:userId/followers', async (req, res) => {
  const { userId } = req.params
  try {
    const users = await User.find({ _id: userId })
      .populate('followers')
      .select('-local.password')
    if (!users)
      return res.status(404).json({ message: transErrors.user_not_found })

    return res.status(200).json({ user: users[0] })
  } catch (error) {
    console.log({ error })
    res.status(404).json({ message: error.message })
  }
})

// Show all following
// [GET] api/users/:userId/following
router.get('/:userId/following', async (req, res) => {
  const { userId } = req.params
  try {
    let users = await User.find({ _id: userId })
      .populate('following')
      .select('-local.password')
    if (!users)
      return res.status(404).json({ message: transErrors.user_not_found })

    return res.status(200).json({ user: users[0] })
  } catch (error) {
    console.log({ error })
    res.status(404).json({ message: error.message })
  }
})

// profile picture dir
let profile_picture_dir = 'src/public/assets/images/users/profilePics'
let cover_photo_dir = 'src/public/assets/images/users/coverPhotos'

// storage profile picture
const storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${profile_picture_dir}`)
  },
  filename: (req, file, cb) => {
    let filename = `${Date.now()}-${req.user._id.toString()}.png`
    cb(null, filename)
  },
})
const uploadProfilePic = multer({ storage: storageImage }).single(
  'croppedImage'
)

// [PATCH] api/users/profilePicture
router.patch('/profilePicture', (req, res) => {
  uploadProfilePic(req, res, async error => {
    if (error) {
      console.log('No file uploaded with ajax request.')
      return res.status(400).send(transErrors.avatar_size)
    }
    try {
      let profilePicName = req.file.filename
      let currentUser = req.user
      // find user by id and update profilePic
      let userUpdated = await User.findByUserIdAndUpdate(currentUser._id, {
        profilePic: profilePicName,
      })
      // remove old profile picture
      fsExtra.removeSync(`${profile_picture_dir}/${currentUser.profilePic}`)
      let result = {
        filepath: `${req.file.destination}${userUpdated.profilePic}`,
        message: tranSuccess.avatar_update,
      }
      return res.status(200).json(result)
    } catch (error) {
      // remove new profile picture
      fsExtra.removeSync(`${profile_picture_dir}/${profilePicName}`)
      console.log({ error })
      res.status(500).json({ message: 'Cập nhập ảnh đại diện thất bạn!' })
    }
  })
})

// storage profile picture
const storageCoverPhoto = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${cover_photo_dir}`)
  },
  filename: (req, file, cb) => {
    let filename = `${Date.now()}-${req.user._id.toString()}.png`
    cb(null, filename)
  },
})
const uploadCoverPhoto = multer({ storage: storageCoverPhoto }).single(
  'coppedCoverPhoto'
)
// [PATCH] api/users/coverPhoto
router.patch('/coverPhoto', (req, res) => {
  uploadCoverPhoto(req, res, async error => {
    if (error) {
      console.log('No file uploaded with ajax request.')
      return res.status(400).send(transErrors.avatar_size)
    }
    try {
      let coverPhotoName = req.file.filename
      let currentUser = req.user
      // find user by id and update profilePic
      let userUpdated = await User.findByUserIdAndUpdate(currentUser._id, {
        coverPhoto: coverPhotoName,
      })
      // remove old profile picture
      fsExtra.removeSync(`${cover_photo_dir}/${currentUser.coverPhoto}`)
      let result = {
        filepath: `${req.file.destination}${userUpdated.coverPhoto}`,
        message: tranSuccess.cover_photo_update,
      }
      return res.status(200).json(result)
    } catch (error) {
      // remove new profile picture
      fsExtra.removeSync(`${cover_photo_dir}/${coverPhotoName}`)
      console.log({ error })
      res.status(500).json({ message: 'Cập nhập ảnh đại diện thất bạn!' })
    }
  })
})

export default router
