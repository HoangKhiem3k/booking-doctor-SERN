import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { LANGUAGES } from "../../../utils/constant";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: "",
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      listDoctors:[]
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctors()
  }
  componentDidUpdate(prevProps, prevState) {

    if(prevProps.allDoctors !== this.props.allDoctors){
      let dataSelect = this.builDataInputSelect(this.props.allDoctors)
      this.setState({
        listDoctors: dataSelect,
      })
    }
    if(prevProps.language !== this.props.language){
      let dataSelect = this.builDataInputSelect(this.props.allDoctors)
      this.setState({
        listDoctors: dataSelect,
      })
    }
    console.log("listDoctors: ", this.state.listDoctors)
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };
  handleSaveContentMarkdown = () => {
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
    })
  };
  handleChange = (selectedDoctor) => {
    this.setState({ selectedDoctor }, () =>
      console.log(`Option selected:`, this.state.selectedDoctor)
    );
  };
  handleOnChangeDescription = (event) => {
    this.setState({ description: event.target.value }, () =>
      console.log(`Option selected:`, this.state.description)
    );
  };
  builDataInputSelect = (inputData) => {
    let result = []
    let language = this.props.language 
    if(inputData && inputData.length>0){
      inputData.map((item, index)=> {
        let object = {}
        let labelVi = `${item.lastName} ${item.firstName}`
        let labelEn = `${item.firstName} ${item.lastName}`
        object.label = language === LANGUAGES.VI ? labelVi : labelEn
        object.value = item.id
        result.push(object)
      })
    }
    return result
  }
  render() {
    console.log("this state: ", this.state)
    return (
      <React.Fragment>
        <div className="manage-doctor-container">
          <div className="manage-doctor-title">Thong tin doctor</div>
          <div className="more-infor">
            <div className="content-left form-group">
              <label>Chon bac si</label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChange}
                options={this.state.listDoctors}
              />
            </div>
            <div className="content-right form-group">
              <label>Thong tin gioi thieu</label>
              <textarea
                className="form-control"
                rows="4"
                onChange={(event) => this.handleOnChangeDescription(event)}
                value={this.state.description}
              >
                asdfasdf
              </textarea>
            </div>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          className="save-content-doctor"
          onClick={() => this.handleSaveContentMarkdown()}
        >
          Save
        </button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
