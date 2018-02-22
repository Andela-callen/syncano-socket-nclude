import Server from 'syncano-server';
import Validator from 'validatorjs';
import { collectionRules } from './utils/helpers';

export default async (ctx) => {
  const { data, response } = new Server(ctx);
  const { personalInfo, amenities, longitude, latitude, geocode } = ctx.args;

  const {user} = ctx.meta;
  if (!user) {
    return response.json({ message: 'Please login' }, 401);
  }
  const validator = new Validator(ctx.args, collectionRules);

  if (validator.passes()) {
    try {
      const result = await data.collection.create({
        personalInfo, amenities, longitude, latitude, geocode,
        user: user.username, verified: 'false'
      });
      console.log(result, 'result');
      return response.json({ message: 'Saved successfully'});
    } catch (err) {
      return response.json({ message: err.message }, 400);
    }
  } else {
    return response.json({ message: 'Validation errors', errors: validator.errors.all() }, 400);
  }
};
