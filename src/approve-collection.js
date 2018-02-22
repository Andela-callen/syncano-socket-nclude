import Server from 'syncano-server';

export default async (ctx) => {
  const { data, response } = new Server(ctx);
  const { collection_id } = ctx.args;

  const {user} = ctx.meta;
  if (!user) {
    return response.json({ message: 'Please login' }, 401);
  }

  try {
    const result = data.collection.update(collection_id, { verified: 'true'});
    if (result) {
      return response.json({ message: 'Approved'});
    }
  } catch (err) {
    return response.json({ message: err.message }, 400);
  }
};
