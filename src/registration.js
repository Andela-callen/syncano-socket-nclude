import Server from 'syncano-server';
import Validator from 'validatorjs';
import { regRules } from './utils/helpers';

export default async (ctx) => {
  const {
    data, users, response, logger
  } = new Server(ctx);
  const {
    email,
    password,
    type,
    btcAccount,
  } = ctx.args;

  const { debug } = logger('user:auth:register');

  const validator = new Validator(ctx.args, regRules);

  if (validator.passes()) {
    let user;
    try {
      user = await users.where('username', 'eq', email).first();
      if (user) {
        return response.json({ message: 'Email already exists.' }, 400);
      }
      // save image to s3 bucket

      user = await users.create({
        username: email,
        type,
        password,
        btcAccount
      });
      console.log(user, 'user');
      return response.json({
        message: 'Registration Successful.',
        id: user.id,
        token: user.user_key,
        username: user.username
      });
    } catch (err) {
      return response.json({ message: err.message }, 400);
    }
  } else {
    return response.json({ message: 'Validation errors', errors: validator.errors.all() }, 400);
  }
};
