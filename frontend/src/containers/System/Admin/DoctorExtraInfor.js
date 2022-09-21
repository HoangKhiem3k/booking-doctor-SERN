import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { FormattedMessage } from "react-intl";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
    };
  }
  componentDidMount() {}
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }
  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };

  render() {
    let { isShowDetailInfor } = this.state;
    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address">da nang</div>
          <div className="name-clinic">da lieu</div>
          <div className="detail-address">trung nu vuong</div>
        </div>
        <div className="content-down">
          {isShowDetailInfor === false && (
            <div className="short-infor">
              GIA KHAM: 205.000
              <span onClick={() => this.showHideDetailInfor(true)}>
                Xem chi tiet
              </span>
            </div>
          )}
          {isShowDetailInfor === true && (
            <>
              <div className="title-price">GIA KHAM: . </div>
              <div className="detail-infor">
                <div className="price">
                  <span className="left">Gia kham</span>
                  <span className="right">205.000</span>
                </div>
                <div className="note">
                  duoc uu tien kham khi dat truoc qua web
                </div>
              </div>
              <div className="payment">
                nguoi benh co the thanh toan bang cac phuong thuc
              </div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfor(false)}>
                  An bang gia
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    // deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
