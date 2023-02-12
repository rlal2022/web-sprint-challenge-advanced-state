import React from "react";
import { connect } from "react-redux";

export function Message(props) {
  return <div id="message">{props.message}</div>;
}

const mapStateToProps = (state) => {
  return {
    infoMessage: state.infoMessage.message,
  };
};
export default connect(mapStateToProps)(Message);
