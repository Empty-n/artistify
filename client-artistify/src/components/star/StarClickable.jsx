import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStar as fullStar,
  faStarHalfAlt as halfStar
} from "@fortawesome/free-solid-svg-icons";

export default class StarClickable extends Component {
  state = {
    icon:
      this.props.shape === "full"
        ? fullStar
        : this.props.shape === "empty"
        ? emptyStar
        : halfStar,
    css: this.props.shape === "full" ? "star full" : "star"
  };

  render() {
    const { rate, clbk } = this.props;
    const { icon, css } = this.state;
    
    return (
      <FontAwesomeIcon
        data-rate={rate}
        // onMouseOver={this.handleMouseOver}
        onClick={clbk}
        className={"is-clickable " + css}
        icon={icon}
      ></FontAwesomeIcon>
    );
  }
}
