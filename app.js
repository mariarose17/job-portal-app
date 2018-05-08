import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Home from './pages/homePage';
import Login from './pages/login';
import AdminPanel from './pages/adminPage';
import AddPost from './pages/addPostPage';
import ManagePost from './pages/managePostsPage';
import AddPostCsv from './pages/addPostsCsvPage';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <div>

            <Route
              exact
              path="/"

              component={Home}
            />
            <Route

              path="/login"
              component={Login}
            />

            <Route

              path="/adminPage"
              component={AdminPanel}
            />
            <Route
              path="/addpost"
              component={AddPost}

            />
            <Route
              path="/managepost"
              component={ManagePost}

            />
            <Route
              path="/addposts"
              component={AddPostCsv}

            />

          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}
export default App;