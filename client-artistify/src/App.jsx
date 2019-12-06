import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

// pages components
import Home from "./views/Home";
import AdminTables from "./views/AdminTables";
import AdminForms from "./views/AdminForms";
import Artists from "./views/Artists";
import Artist from "./views/Artist";
import Albums from "./views/Albums";
import Album from "./views/Album";
import Contact from "./views/Contact";
import Dashboard from "./views/Dashboard";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";

// partials
import HeaderMain from "./components/HeaderMain";
import SearchResults from "./components/search/SearchResults";
import FooterMain from "./components/FooterMain";
import NavMobile from "./components/nav/NavMobile";

// auth
import { useAuth } from "./auth/useAuth";
import UserContext from "./auth/UserContext";
import { ProtectedRoute } from "./auth/ProtectedRoute";

const App = function App(props) {
  const { isLoading } = useAuth();
  const [navMobileStatus, setNavMobileStatus] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  // MANDATORY TO GET/SET currentUser according to server response
  // check src/auth/UserContext
  const UserContextValue = {
    currentUser,
    setCurrentUser
  };

  const handleNavMobileStatus = () => {
    setNavMobileStatus(!navMobileStatus);
  };

  const handleSearchResults = results => {
    if (!results) return setSearchResults([]);
    if (results.albums.length || results.artists.length)
      return setSearchResults(results);
  };


  return (
    // the context provider will make currentUser informations down the component tree
    <UserContext.Provider value={UserContextValue}>
      {isLoading ? (
        null
      ) : (
        <React.Fragment>
          <HeaderMain
            navMobileClbk={handleNavMobileStatus}
            searchClbk={handleSearchResults}
          />

          <SearchResults data={searchResults} />

          <NavMobile
            navMobileStatus={navMobileStatus}
            navMobileClbk={handleNavMobileStatus}
          />

          <main id="content_main">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/artists" component={Artists} />
              <Route path="/artists/:id" component={Artist} />
              <Route exact path="/albums" component={Albums} />
              <Route path="/albums/:id" component={Album} />
              <Route path="/contact-us" component={Contact} />

              <Route path="/signin" component={Signin} />
              <Route path="/signup" component={Signup} />

              <ProtectedRoute path="/dashboard" component={Dashboard} />

              <ProtectedRoute
                exact
                path="/admin/:endpoint(albums|artists|labels|styles)/"
                component={AdminTables}
              />

              <ProtectedRoute
                exact
                path="/admin/:endpoint(albums|artists|labels|styles)/:mode"
                component={AdminForms}
              />

              <ProtectedRoute
                exact
                path="/admin/:endpoint(albums|artists|labels|styles)/:mode/:id"
                component={AdminForms}
              />
              <Route path="*" component={NotFound} />
            </Switch>
          </main>
          <FooterMain />
        </React.Fragment>
      )}
    </UserContext.Provider>
  );
};
// });

export default App;
