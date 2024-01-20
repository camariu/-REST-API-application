const Contact = require("./schemas/schemaContacts.js");
const User = require("./schemas/schemaUsers.js")

const getAllContacts = async () => {
  return Contact.find();
};
const getContactById = async (id) => {
  return Contact.findById(id);
};
const createContact = async ({ name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite });
};
const deleteContact = async (id) => {
  return Contact.findByIdAndDelete(id);
};
const updateContact = async (id, data) => {
  return Contact.findByIdAndUpdate(id, data, { new: true });
};
const updateContactStatus = async (id, data) => {
  return Contact.findByIdAndUpdate(id, data, { new: true });
};

const createUser = async ({ email, password }) => {
  const userExistent = await User.findOne({ email });

  if (userExistent) {
    throw new Error("Email already in use!");
  }

  const newUser = new User({ email, password });
  newUser.setPassword(password);
  return await newUser.save();
};

const loginUser = async ({ email, password, token }) => {
  const user = await User.findOne({ email });

  if (!user || !user.validPassword(password)) {
    throw new Error("Wrong email or password");
  }

  user.setToken(token);
  await user.save();
  return user;
};

const findUser = async (user) => {
  const result = await User.findOne({ email: user.email });
  return result;
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  updateContactStatus,
  createUser,
  loginUser,
  findUser,
};
