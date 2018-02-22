import Server from 'syncano-server';

export default async (ctx) => {
  const { data, response } = new Server(ctx);

  const {user} = ctx.meta;
  if (!user) {
    return response.json({ message: 'Please login' }, 400);
  }

  try {
    const result = await data.collection.list();
    return response.json(result);
  } catch (err) {
    return response.json({ message: err.message }, 400);
  }
};
