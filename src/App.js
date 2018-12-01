import React, { Component } from 'react';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="body">
        <div className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-collapse navbar-collapse-1 collapse" aria-expanded="true">
              <ul className="nav navbar-nav custom-css">
                <li className="active">
                  <a href="/"><span className="glyphicon glyphicon-home" /> Home</a>
                </li>
                <li>
                  <a href="/"><span className="glyphicon glyphicon-bell" /> Notifications</a>
                </li>
                <li>
                  <a href="/"><span className="glyphicon glyphicon-envelope" /> Messages</a>
                </li>
              </ul>
              <div className="navbar-form navbar-right">
                <div className="form-group has-feedback search">
                  <input type="text" className="form-control-nav search custom-css" id="search" aria-describedby="search1"
                    placeholder="Search..." />
                  <span className="glyphicon glyphicon-search form-control-feedback" aria-hidden="true" />
                </div>
                <button className="btn btn-primary tweet" type="submit" aria-label="Left Align">
                  <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Tweet
          </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <div className="panel panel-default">
                <div className="panel-body">
                  <a href="/"><img className="img-responsive" alt="demo" src="http://placehold.it/800x500" /></a>
                  <div className="user-info">
                    <h4>Ngoc Bao</h4>
                    <p>@dieu_bao</p>
                  </div>
                  <div className="row">
                    <div className="col-xs-3 tweets-tag">
                      <h5>
                        <p>TWEETS</p>
                        <a href="/">1,545</a>
                      </h5>
                    </div>
                    <div className="col-xs-4 following-tag">
                      <h5>
                        <p>FOLLOWING</p>
                        <a href="/">251</a>
                      </h5>
                    </div>
                    <div className="col-xs-5 followers-tag">
                      <h5>
                        <p>FOLLOWERS</p>
                        <a href="/">153</a>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel panel-default panel-custom trends">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    Trends
            </h3>
                </div>
                <div className="panel-body">
                  <ul className="list-unstyled">
                    <li><a href="/">#Cras justo odio</a></li>
                    <li><a href="/">#Dapibus ac facilisis in</a></li>
                    <li><a href="/">#Morbi leo risus</a></li>
                    <li><a href="/">#Porta ac consectetur ac</a></li>
                    <li><a href="/">#Vestibulum at eros</a></li>
                    <li><a href="/">#Vestibulum at eros</a></li>
                    <li><a href="/">#Vestibulum at eros</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="panel panel-info">
                <div className="panel-heading">
                  <div className="media">
                    <a className="media-left" href="#fake">
                      <img alt="demo" className="media-object img-circle" src="http://placehold.it/35x35" />
                    </a>
                    <div className="media-body">
                      <div className="form-group has-feedback">
                        <label className="control-label sr-only" htmlFor="inputSuccess5">Hidden label</label>
                        <input type="text" className="form-control" id="search2" aria-describedby="search" />
                        <span className="glyphicon glyphicon-camera form-control-feedback" aria-hidden="true" />
                        <span id="search2" className="sr-only">(success)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="panel-body">
                  <div className="media">
                    <a className="media-left" href="/">
                      <img alt="demo" className="media-object img-circle" src="http://placehold.it/64x64" />
                    </a>
                    <div className="media-body">
                      <h4 className="media-heading">Media heading</h4>
                      <p>Dolorem aspernatur rerum, iure? Culpa iste aperiam sequi, fuga, quasi rerum, eum, quo natus
                  tenetur officia placeat.</p>
                      <ul className="nav nav-pills nav-pills-custom">
                        <li><a href="/"><span className="glyphicon glyphicon-heart" /></a></li>
                        <li><a href="/"><span className="glyphicon glyphicon-comment" /></a></li>
                        <li><a href="/"><span className="glyphicon glyphicon-share-alt" /></a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="media">
                    <a className="media-left" href="#fake">
                      <img alt="demo" className="media-object img-circle" src="http://placehold.it/64x64" />
                    </a>
                    <div className="media-body">
                      <h4 className="media-heading">Media heading</h4>
                      <p>Dolorem aspernatur rerum, iure? Culpa iste aperiam sequi, fuga, quasi rerum, eum, quo natus
                  tenetur officia placeat.</p>
                      <ul className="nav nav-pills nav-pills-custom">
                        <li><a href="/"><span className="glyphicon glyphicon-heart" /></a></li>
                        <li><a href="/"><span className="glyphicon glyphicon-comment" /></a></li>
                        <li><a href="/"><span className="glyphicon glyphicon-share-alt" /></a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="media">
                    <a className="media-left" href="#fake">
                      <img alt="demo" className="media-object img-circle" src="http://placehold.it/64x64" />
                    </a>
                    <div className="media-body">
                      <h4 className="media-heading">Media heading</h4>
                      <p>Dolorem aspernatur rerum, iure? Culpa iste aperiam sequi, fuga, quasi rerum, eum, quo natus
                  tenetur officia placeat.</p>
                      <ul className="nav nav-pills nav-pills-custom">
                        <li><a href="/"><span className="glyphicon glyphicon-heart" /></a></li>
                        <li><a href="/"><span className="glyphicon glyphicon-comment" /></a></li>
                        <li><a href="/"><span className="glyphicon glyphicon-share-alt" /></a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="media">
                    <a className="media-left" href="#fake">
                      <img alt="demo" className="media-object img-circle" src="http://placehold.it/64x64" />
                    </a>
                    <div className="media-body">
                      <h4 className="media-heading">Media heading</h4>
                      <p>Dolorem aspernatur rerum, iure? Culpa iste aperiam sequi, fuga, quasi rerum, eum, quo natus
                  tenetur officia placeat.</p>
                      <ul className="nav nav-pills nav-pills-custom">
                        <li><a href="/"><span className="glyphicon glyphicon-heart" /></a></li>
                        <li><a href="/"><span className="glyphicon glyphicon-comment" /></a></li>
                        <li><a href="/"><span className="glyphicon glyphicon-share-alt" /></a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="media">
                    <a className="media-left" href="#fake">
                      <img alt="demo" className="media-object img-circle" src="http://placehold.it/64x64" />
                    </a>
                    <div className="media-body">
                      <h4 className="media-heading">Media heading</h4>
                      <p>Dolorem aspernatur rerum, iure? Culpa iste aperiam sequi, fuga, quasi rerum, eum, quo natus
                  tenetur officia placeat.</p>
                      <ul className="nav nav-pills nav-pills-custom">
                        <li><a href="/"><span className="glyphicon glyphicon-heart" /></a></li>
                        <li><a href="/"><span className="glyphicon glyphicon-comment" /></a></li>
                        <li><a href="/"><span className="glyphicon glyphicon-share-alt" /></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <br />
            </div>
            <div className="col-sm-3">
              <div className="panel panel-default panel-custom .follow-panel">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    Who to follow
            </h3>
                  <a href="/">Refresh</a>
                  <a href="/">View all</a>
                </div>
                <div className="panel-body">
                  <div className="media">
                    <div className="media-left">
                      <img src="http://placehold.it/32x32" alt="demo" className="media-object img-circle" />
                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">Nome e cognome</h4>
                      <a href="/" className="btn btn-default btn-xs">
                        +
                  <span className="glyphicon glyphicon-user"></span> Follow
                </a>
                    </div>
                  </div>
                  <div className="media">
                    <div className="media-left">
                      <img src="http://placehold.it/32x32" alt="demo" className="media-object img-circle" />
                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">Nome e cognome</h4>
                      <a href="/" className="btn btn-default btn-xs">
                        +
                  <span className="glyphicon glyphicon-user"></span> Follow
                </a>
                    </div>
                  </div>
                  <div className="media">
                    <div className="media-left">
                      <img src="http://placehold.it/32x32" alt="demo" className="media-object img-circle" />
                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">Nome e cognome</h4>
                      <a href="/" className="btn btn-default btn-xs">
                        +
                  <span className="glyphicon glyphicon-user"></span> Follow
                </a>
                    </div>
                  </div>
                </div>
                <div className="panel-footer">
                  <a href="/">
                    <span className="glyphicon glyphicon-user"></span> Find people you know
            </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;