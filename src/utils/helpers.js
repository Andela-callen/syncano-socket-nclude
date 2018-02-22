const regRules = {
  password: 'required',
  email: 'required|email',
};

const collectionRules = {
  personalInfo: 'required',
  amenities: 'required',
  longitude: 'required',
  latitude: 'required',
  geocode: 'required'
};

export {
  regRules,
  collectionRules
};
