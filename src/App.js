import React, { Component } from 'react'
import Navbar from './components/Navbar.js'
import News from './components/News.js'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

export default class App extends Component {
  pageSize=9;
  apiKey=process.env.REACT_APP_NEWS_API;
  render() {
    const router = createBrowserRouter([
      { path: "/", element: <><Navbar /><News key="general" apiKey={this.apiKey} country='in' pageSize={this.pageSize} category='general' /></> },
      { path: "/entertainment", element: <><Navbar /><News key="entertainment" apiKey={this.apiKey} country='in' pageSize={this.pageSize} category='entertainment' /></> },
      { path: "/business", element: <><Navbar /><News key="business" apiKey={this.apiKey} country='in' pageSize={this.pageSize} category='business' /></> },
      { path: "/sports", element: <><Navbar /><News key="sports" apiKey={this.apiKey} country='in' pageSize={this.pageSize} category='sports' /></> },
      { path: "/science", element: <><Navbar /><News key="science" apiKey={this.apiKey} country='in' pageSize={this.pageSize} category='science' /></> },
      { path: "/technology", element: <><Navbar /><News key="technology" apiKey={this.apiKey} country='in' pageSize={this.pageSize} category='technology' /></> },
      { path: "/health", element: <><Navbar /><News key="health" apiKey={this.apiKey} country='in' pageSize={this.pageSize} category='health' /></> }

    ])
    return (
      <div>
        <RouterProvider router={router} />
      </div>
    )
  }
}
