import GitHubStrategy from "passport-github2"

const config = {
    clientID: "Ov23li24zAamMr705EBv",
    clientSecret: "98060eb4e7b2a66a1271d6557175b92d50bcfd90",
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
}

const githubStrategyCallback = function (accessToken, refreshToken, profile, done) {

    console.log("🚀 ~ github.strategy.js:17 ~ githubStrategyCallback ~ profile:", profile)

    User.findOrCreate({ githubId: profile.id }, function (err, user) {
        return done(err, user);
    });
}

const githubStrategy = new GitHubStrategy(config, githubStrategyCallback)

export default githubStrategy