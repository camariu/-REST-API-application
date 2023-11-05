const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    console.table(contacts);
    return contacts;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contactById = contacts.find((contact) => contact.id === contactId);
    return contactById;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index !== -1) {
      contacts.splice(index, 1);
      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function addContact(name, email, phone) {
  if (!name && !email && !phone) {
    return null;
  }
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContacts = {
      id: String(Date.now()),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(newContacts);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function updateContact(id, name, email, phone) {
  if (!id || (!name && !email && !phone)) {
    return null;
  }
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const findContact = contacts.find((contact) => contact.id === id);
    if (!findContact) {
      return null;
    }
    if (name) findContact.name = name;
    if (email) findContact.email = email;
    if (phone) findContact.phone = phone;
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return findContact;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
