import doctorService from "../services/doctorService";

let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) {
    limit = 10;
  }
  try {
    let resp = await doctorService.getTopDoctorHome(+limit);
    console.log(`resp`, resp);
    return res.status(200).json(resp);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctors();
    console.log(`resp`, doctors);
    return res.status(200).json(doctors);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let postInforDoctor = async (req, res) => {
  try {
    let resp = await doctorService.saveDetailInforDoctor(req.body);
    return res.status(200).json(resp);
  } catch(e){
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });

  }
}
let getDetailDoctorById = async (req, res) => {
  try{
    let infor = await doctorService.getDetailDoctorById(req.query.id);
    return res.status(200).json(infor);
  }catch(e){
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
}
module.exports = {
  getTopDoctorHome,
  getAllDoctors,
  postInforDoctor,
  getDetailDoctorById
};
