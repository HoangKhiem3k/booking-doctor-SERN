import React, { Component } from "react";
import { connect, ReactReduxContext } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllSpecialty } from "../../../services/userService";
import { withRouter } from "react-router";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = { dataSpecially: [] };
  }
  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({ dataSpecially: res.data ? res.data : [] });
    }
  }
  componentDidUpdate(prevProps) {}
  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };
  render() {
    let { dataSpecially } = this.state;

    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="home-page.specialty-popular" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="home-page.more-infor" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataSpecially && dataSpecially.length > 0
                ? dataSpecially.map((item, index) => {
                    return (
                      <div
                        className="section-customize specialty-child"
                        key={index}
                        onClick={() => this.handleViewDetailSpecialty(item)}
                      >
                        <div
                          className="bg-image section-specialty"
                          style={{ backgroundImage: `url(${item.image})` }}
                        />
                        <div className="specialty-name">{item.name}</div>
                      </div>
                    );
                  })
                : ""}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
