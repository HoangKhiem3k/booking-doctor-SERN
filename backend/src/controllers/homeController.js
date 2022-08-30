import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log(data);
    return res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};
let getCRUD = async (req, res) => {
  try {
    return res.render("crud.ejs");
  } catch (e) {
    console.log(e);
  }
};
let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
};

module.exports = {
  getHomePage,
  getCRUD,
  postCRUD,
};
