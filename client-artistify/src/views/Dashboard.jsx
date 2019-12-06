import React, { useState } from "react";
// custom tools
import FormEditAccount from "./../components/form/FormEditAccount";
import IconSignout from "../components/icon/IconSignout";

export default function Dashboard() {
  const [UIState, setUIState] = useState("edit");

  return (
    <div className="page dashboard">
      <h1 className="title">
        <span>Dashboard</span>
        <IconSignout />
      </h1>

      <div className="row">
        <button
          onClick={() => setUIState("edit")}
          className={`btn ${UIState === "edit" ? "is-active" : ""}`}
        >
          edit infos
        </button>
        <button
          onClick={() => setUIState("favorites")}
          className={`btn ${UIState === "favorites" ? "is-active" : ""}`}
        >
          my favorites
        </button>
      </div>
      {UIState === "edit" && <FormEditAccount />}
      {UIState === "favorites" && (
        <div>
          <h1 className="title">D.I.Y</h1>
          <p>
            Fetch currentUser's favorites with axios.
            <br />
            Update the rendered template to display them.
            <br />
            It would be better to create a dedicated component.
          </p>
        </div>
      )}
    </div>
  );
}
