import Server from 'syncano-server';

export default async (ctx) => {
  const {users, response, logger} = new Server(ctx);
  const {email, password} = ctx.args;

  const {debug} = logger('user:auth:login');

  try {
    const authorizedUser = await users.login({username: email, password});

    response.json({
      token: authorizedUser.user_key,
      username: authorizedUser.username
    });
  } catch (err) {
    debug(err);
    response.json({message: 'Given credentials are invalid.'}, 400);
  }
};
