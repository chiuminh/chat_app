import User from '../models/User'

class ProfileService {
  /**
   * get payLoad
   * @param {string} username
   * @param {object} userLoggedIn
   * @returns
   */
  async getPayLoad(username, userLoggedIn) {
    const user =
      (await User.findByUsername(username)) ||
      (await User.findUserNormalById(username))
    if (user) {
      return {
        pageTitle: user.username,
        user: userLoggedIn,
        profileUser: user,
        userLoggedInJs: JSON.stringify(userLoggedIn),
      }
    }
    return {
      pageTitle: 'User not found',
      user: userLoggedIn,
      userLoggedInJs: JSON.stringify(userLoggedIn),
    }
  }
}

export default new ProfileService()
