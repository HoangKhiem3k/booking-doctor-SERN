import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils/constant";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { getAllPatientForDoctor } from "../../../services/userService";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
    };
  }
  async componentDidMount() {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();
    this.getDataPatient(user, formatedDate);
  }
  getDataPatient = async (user, formatedDate) => {
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formatedDate);
      }
    );
  };
  handleBtnConfirm = () => {};
  handleBtnRemedy = () => {};
  render() {
    let { dataPatient } = this.state;
    console.log("check dataPatient:", dataPatient);
    return (
      <div className="manage-patient-container">
        <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>
        <div className="manage-patient-body row">
          <div className="form-group col-4">
            <label>Chọn ngày khám</label>
            <DatePicker
              onChange={this.handleChangeDatePicker}
              className="form-control"
              value={this.state.currentDate}
            />
          </div>
          <div className="col-12 table-manage-patient">
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <th>STT</th>
                  <th>Thời gian</th>
                  <th>Họ và tên</th>
                  <th>Địa chỉ</th>
                  <th>Giới tính</th>
                  <th>Actions</th>
                </tr>
                {dataPatient && dataPatient.length > 0 ? (
                  dataPatient.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.timeTypeDataPatient.valueVi}</td>
                        <td>{item.patientData.firstName}</td>
                        <td>{item.patientData.address}</td>
                        <td>{item.patientData.genderData.valueVi}</td>
                        <td>
                          <button
                            className="mp-btn-confirm"
                            onClick={() => this.handleBtnConfirm()}
                          >
                            Xác nhận
                          </button>
                          <button
                            className="mp-btn-remedy"
                            onClick={() => this.handleBtnRemedy()}
                          >
                            Gửi hóa đơn
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>no data</tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
