import fetch from 'axios';
import Server from 'syncano-server';

export default async (ctx) => {
  const { response } = Server(ctx);
  const {email, password} = ctx.args;
  const AUTH_URL = `https://api.syncano.io/v2/instances/${ctx.meta.instance}/users/auth/`;
  try {
    const resp = await fetch({
      url: AUTH_URL,
      method: 'POST',
      data: {username: email, password},
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': ctx.meta.token
      }
    });
    return response.json({
      username: resp.data.username,
      token: resp.data.user_key
    });
  } catch (error) {
    response.json({message: 'Given credentials are invalid.'}, 400);
  }
};

