import React, { Component } from "react";
// custom tools
import apiHandler from "../api/APIHandler";
import CardAlbum from "../components/card/CardAlbum";
import Comments from "../components/comment/Comments";
import List from "../components/List";
import Stars from "../components/star/Stars";
// styles
import "./../styles/artist.css";
import "./../styles/comment.css";
import "./../styles/star.css";

let _endpoint;

export default class Artist extends Component {
  state = {
    artist: {},
    albums: [],
    userRate: null,
    loaded: false
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
    _endpoint = `/artists/${this.props.match.params.id}`;
  };

  updateState = async () => {
    try {
      const apiRes = await apiHandler.get(_endpoint);

      this.setState({
        loaded: true,
        artist: apiRes.data.artist,
        albums: apiRes.data.albums,
        userRate: apiRes.data.userRate ? apiRes.data.userRate.rate : null
      });
    } catch (err) {
      console.error(err);
    }
  };

  setRate = async evt => {
    const rate = Number(evt.currentTarget.getAttribute("data-rate"));
    await apiHandler.patch(_endpoint + "/rates", { rate });
    this.updateState();
  };

  render() {
    const { artist, albums, userRate, loaded } = this.state;

    if (!artist || !loaded) return <p>loading...</p>;

    return (
      <div className="page artist">
        <h1 className="title">{artist.name}</h1>
        <p className="description">{artist.description}</p>

        <div className="all-stars">
          <Stars avgRate={artist.avg} title="average rate" />
          <Stars
            css="user"
            avgRate={userRate}
            clbk={this.setRate}
            title="your rate"
          />
        </div>
        <Comments id={this.props.match.params.id} type="artist" />
        <div className="discography">
          <h2 className="title">Discography</h2>
          <List
            data={albums}
            Component={CardAlbum}
            cssList="grid albums mini"
            cssItem="album"
          />
        </div>
      </div>
    );
  }
}
