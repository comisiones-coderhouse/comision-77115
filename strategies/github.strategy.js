import GitHubStrategy from "passport-github2";
import UserDAO from "../dao/user.dao.js";

const config = {
  clientID: "Ov23li24zAamMr705EBv",
  clientSecret: "98060eb4e7b2a66a1271d6557175b92d50bcfd90",
  callbackURL: "http://127.0.0.1:3000/auth/github/callback",
};

const githubStrategyCallback = async function (
  accessToken,
  refreshToken,
  profile,
  done,
) {
  try {
    const user = await UserDAO.findOrCreateUser(profile.emails[0].value);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
};

const githubStrategy = new GitHubStrategy(config, githubStrategyCallback);

export default githubStrategy;
