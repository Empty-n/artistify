import React, { Component } from "react";
import { Link } from "react-router-dom";
// custom tools
import apiHandler from "../api/APIHandler";
import Comments from "../components/comment/Comments";
import FormatDate from "./../components/FormatDate";
import Stars from "../components/star/Stars";
// styles
import "./../styles/album.css";
import "./../styles/comment.css";
import "./../styles/star.css";

var _endpoint;

export default class Album extends Component {
  state = {
    album: {},
    userRate: null
  };

  componentDidMount() {
    this.updateEndoint();
    this.updateState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.updateEndoint();
      this.updateState();
    }
  }

  updateEndoint = () => {
    _endpoint = `/albums/${this.props.match.params.id}`;
  }

  updateRate = async evt => {
    const rate = Number(evt.currentTarget.getAttribute("data-rate"));
    const r = await apiHandler.patch(_endpoint + "/rates", { rate });
    this.updateState();
    console.log("rates updated !", r);
  };

  updateState = async () => {
    try {
      const apiRes = await apiHandler.get(_endpoint);

      this.setState({
        album: apiRes.data.album,
        userRate: apiRes.data.userRate
      });
      console.log(this.state.album);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { album, userRate } = this.state;
    if (!Object.keys(album).length) return null;
    return (
      <div className="page album">
        <h1 className="title">{album.title}</h1>

        <div className="all-stars">
          <Stars avgRate={album.avg} title="average rate" />
          <Stars
            css="user"
            avgRate={userRate}
            clbk={this.updateRate}
            title="your rate"
          />
        </div>

        <img
          src={album.cover}
          alt={`cover ${album.title} `}
          className="cover"
        />

        <p className="description">
          {album.description || "no description yet"}{" "}
        </p>

        <Comments type="album" id={this.props.match.params.id} />

        <p className="publishing">
          Album by&nbsp;
          {album.artist && (
            <Link className="link" to={`/artists/${album.artist._id}`}>
              {album.artist.name}
            </Link>
          )}
          {!album.artist && <span>unknown</span>}
          {album.releaseDate && (
            <span>
              &nbsp;published the <FormatDate date={album.releaseDate} />
            </span>
          )}
          <b>{album.label && <span>&nbsp;by {album.label.name}</span>}</b>
        </p>
      </div>
    );
  }
}
