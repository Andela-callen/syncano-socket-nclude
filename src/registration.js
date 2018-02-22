// import Syncano from "syncano-server";
import Server from "@syncano/core";
import Validator from "validatorjs";
import { regRules } from "./utils/helpers";

export default async ctx => {
  const { data, users, response, logger } = new Server(ctx);
  const {
    email,
    password,
    address,
    phone,
    cryptoBankAcct,
    testResponse
  } = ctx.args;

  const { debug } = logger("user:auth:register");

  const validator = new Validator(ctx.args, regRules);

  if (validator.passes() && testResponse === "true") {
    let user;
    try {
      user = await users.where("username", "eq", email).first();
      if (user) {
        return response.json({ message: "Email already exists." }, 400);
      } else {
        // save image to s3 bucket

        user = await users.create({
          username: email,
          password,
          address,
          phone,
          cryptoBankAcct
        });
        console.log(user, "user");
        return response.json({
          message: "Registration Successful.",
          id: user.id,
          token: user.user_key,
          username: user.username
        });
      }
    } catch (err) {
      // When something went wrong
      // debug(err);
      return response.json({ message: err.message }, 400);
    }
  } else {
    return response.json(validator.errors.all(), 400);
  }
};
