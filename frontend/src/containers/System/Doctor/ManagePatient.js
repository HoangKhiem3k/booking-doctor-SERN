import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils/constant";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
    };
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  render() {
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
              <tr>
                <th>Name</th>
                <th colSpan="2">Telephone</th>
              </tr>
              <tr>
                <td>Bill gate</td>
                <td>123412341234123</td>
                <td>123412341234</td>
              </tr>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
