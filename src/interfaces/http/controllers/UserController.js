const { Router } = require("express");
const Status = require("http-status");
const BaseController = require("./BaseController");
const router = Router();

class UserController extends BaseController {
  get router() {
    router.get("/", this.getUser.bind(this));
    router.put("/", this.updateUser.bind(this));
    return router;
  }

  async getUser(req, res) {
    const { getUser } = req.container.cradle;
    this.task(getUser(req.user.id)).execute(res);
  }

  async updateUser(req, res) {
    const { updateUser } = req.container.cradle;
    this.task(updateUser(req.user.id)).execute(res);
  }

  async changeUserPassword(req, res) {
    const { changeUserPassword } = req.container.cradle;
    this.task(changeUserPassword(req.user.id))
      .onSuccess(Status.ACCEPTED, "Password changed successfully")
      .execute(res);
  }
}

module.exports = UserController;
