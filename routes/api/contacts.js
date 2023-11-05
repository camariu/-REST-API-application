const express = require("express");

const router = express.Router();

const { listContacts, getContactById, removeContact, addContact, updateContact } = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({
      status: "success",
      code: 200,
      data: { ...contacts },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Contacts are not found",
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const contacts = await getContactById(id);
    res.status(200).json({
      status: "succes",
      code: 200,
      data: {...contacts},
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: "500",
      message: "Contact don't exist",
    });
  }
});

router.post("/", async (req, res, next) => {
  const {name, email, phone} = req.body
  try {
    const contacts = await addContact(name, email, phone)
    res.status(200).json({
      status: "succes",
      code: 200,
      data:  contacts
    })
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: "500",
      message: "The contact don't be add",
    });
  }
  
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const contacts = await removeContact(id)
    res.status(200).json({
      status: "succes",
      code: 200,
      data: {...contacts},
    });
    
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: "500",
      message: "Contact don't exist",
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const {name, email, phone} = req.body
  try {
    const contactUpdate = await updateContact(id, name, email, phone)
    if(!contactUpdate){
      res.status(404).json({
        status: "error",
        code:404,
        message: "Contact not found"
      })
      return
    }
    res.status(200).json({
      status: "succes",
      code: 200,
      data: contactUpdate

    })
  } catch (error) {
    
    res.status(500).json({
      status: "error",
      code: "500",
      message: "Failed to update contact",
    });
  }

});

module.exports = router;
