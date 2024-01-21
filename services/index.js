const Contact = require("./schemas/schemaContacts.js");
const User = require("./schemas/schemaUsers.js");
const sgMail = require("@sendgrid/mail");

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

const createUser = async ({ email, password, name }) => {
  const userExistent = await User.findOne({ email });

  if (userExistent) {
    throw new Error("Email already in use!");
  }

  const codUnicDeVerificare = String(Date.now());

  const msg = {
    to: email,
    from: "amariutei1998@gmail.com",
    subject: "Email de verificare",
    text: `Codul de verificare este ${codUnicDeVerificare} / http://localhost:5000/api/users/verify/${codUnicDeVerificare} `,
  };

  sgMail
    .send(msg)
    .then(() => console.log("Email trimis"))
    .catch(() => {
      throw new Error("Eroare la trimitere");
    });

  const newUser = new User({
    email,
    password,
    name,
    verificationToken: codUnicDeVerificare,
  });
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

const verifyEmail = async (verificationToken) => {
  try {
    const update = { verify: true, verificationToken: null };

    const result = await User.findOneAndUpdate(
      {verificationToken: verificationToken},
      {$set: update},
      { new: true },
    );

    if (!result) throw new Eroor("Userul nu exista");
  } catch (error) {
    console.log(error);
  }
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
  verifyEmail,
};
