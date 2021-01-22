const { Router } = require("express");
const Status = require("http-status");
const BaseController = require("./BaseController");
const router = Router();

class AuthController extends BaseController {
  get router() {
    router.post("/user", this.signupUser.bind(this));
    router.get("/user/token", this.generateUserAuthToken.bind(this));
    router.put("/user/email-verification-request", this.requestUserEmailVerification.bind(this));
    router.put("/user/password-reset-request", this.requestUserPasswordReset.bind(this));
    router.put("/user/password-reset", this.resetUserPassword.bind(this));
    router.put("/user/password-change", this.changeUserPassword.bind(this));
    router.put("/user/email-verification", this.verifyUserEmail.bind(this));
    return router;
  }

  async signupUser(req, res) {
    const { signupUser } = req.container.cradle;
    this.task(signupUser(req.body)).onSuccess(Status.CREATED, "User created successfully").execute(res);
  }

  async generateUserAuthToken(req, res) {
    const { generateUserAuthToken } = req.container.cradle;
    this.task(generateUserAuthToken(req.body)).execute(res);
  }

  async requestUserEmailVerification(req, res) {
    const { requestUserEmailVerification } = req.container.cradle;
    this.task(requestUserEmailVerification(req.body))
      .onSuccess(Status.ACCEPTED, "Email verification instruction has been sent to the provided email")
      .execute(res);
  }

  async requestUserPasswordReset(req, res) {
    const { requestUserPasswordReset } = req.container.cradle;
    this.task(requestUserPasswordReset(req.body))
      .onSuccess(Status.ACCEPTED, "Password reset instruction has been sent to the account email")
      .execute(res);
  }

  async resetUserPassword(req, res) {
    const { resetUserPassword } = req.container.cradle;
    this.task(resetUserPassword(req.body))
      .onSuccess(Status.ACCEPTED, "Password reset successful")
      .execute(res);
  }

  async verifyUserEmail(req, res) {
    const { verifyUserEmail } = req.container.cradle;
    this.task(verifyUserEmail(req.user.id))
      .onSuccess(Status.ACCEPTED, "User email verified successfully")
      .execute(res);
  }
}

module.exports = AuthController;
