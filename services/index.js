const Contact = require("./schemas/schemaContacts.js");

const getAllContacts = async () => {
  return Contact.find();
};

const getContactById = async (id) => {
  return Contact.findById(id);
};

const createContact = async () =>
  ({ name, email, phone, favorite }) => {
    return Contact.create({ name, email, phone, favorite });
  };

const deleteContact =  async (id) =>{
    return Contact.findByIdAndDelete(id)
};

const updateContact = async (id, data) => {
    return Contact.findByIdAndUpdate(id, data, {new: true})
};

const updateContactStatus = async (id, data) => {
    return User.findByIdAndUpdate(id, data, { new: true });
  };

 

module.exports = {
  getAllContacts,
  createContact,
  getContactById,
  deleteContact,
  updateContact,
  updateContactStatus
};
