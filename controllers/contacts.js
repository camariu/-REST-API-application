
const services = require("../services/index.js");

const get = async (req, res, next) => {
    try {
      const results = await services.getAllContacts();
      res.status(200).json({
        status: "Success",
        code: 200,
        data: results,
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        code: 404,
      });
    }
  };
  
  const getById = async (req, res, next) => {
    const id = req.params.contactId;
    try {
      const result = await services.getContactById(id);
      res.status(200).json({
        status: "Success",
        code: 200,
        data: result,
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact not found",
      });
    }
  };
  
  const create = async (req, res, next) => {
    try {
      const {name, email, phone, favorite} = req.body;
      const result = await services.createContact({name, email, phone, favorite,});
      res.status(201).json({
        status: "Success",
        code: 200,
        data: result,
      });
    } catch (error) {
   
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Missing request fields!",
        debug: error,
      });
    }
  };
  
  const remove = async (req, res, next) => {
    const id = req.params.contactId;
  
    try {
      const result = await services.deleteContact(id);
      console.log("Contact removed");
      res.status(200).json({
        status: "Success",
        code: 200,
        data: result,
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact not found!",
      });
    }
  };
  
  const update = async (req, res, next) => {
    const id = req.params.contactId;
    const data = req.body;
  
    try {
      const result = await services.updateContact(id, data);
      console.log("Contact updated");
      res.status(201).json({
        status: "Success",
        code: 201,
        data: result,
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact not found!",
      });
    }
  };
  
  const updateStatus = async (req, res, next) => {
    const id = req.params.contactId;
    const status = req.body;
    if (Object.keys(status).length === 0) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Missing field favorite!",
      });
    }
    try {
      const result = await updateContactStatus(id, status);
      console.log("Contact status updated");
      res.status(200).json({
        status: "Success",
        code: 200,
        data: result,
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact not found!",
      });
    }
  };
  
  module.exports = {
    get,
    getById,
    create,
    remove,
    update,
    updateStatus,
  };