'use strict'
const    Router = ReactRouter.Router,
          Route = ReactRouter.Route,
           Link = ReactRouter.Link,
 browserHistory = ReactRouter.browserHistory;

 import {User} from "./User";

//AUTH TOKEN
localStorage.gistAuthToken = window.location.hash.substring(1);



ReactDOM.render(
  <User />,
  document.getElementById('content')
);