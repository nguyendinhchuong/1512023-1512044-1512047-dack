import React from 'react';

const Followers = () => {
    return (
        <div>
            <div className="panel panel-default panel-custom user-info">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        Followers
            </h3>
                </div>
                <div className="panel-body">
                    <div className="media">
                        <div class="row">
                            <div class="col-xs-12 follow">
                                <div class="panel panel-default follow-card">
                                    <img className="img-responsive" alt="demo" src="http://placehold.it/300x200" />
                                    <div class="panel-body text-center">
                                        <p>Follower Name 1</p>
                                        <button className="btn btn-info"><i class="fa fa-plus"></i> Follow</button>
                                    </div>
                                </div>
                                <div class="panel panel-default follow-card">
                                    <img className="img-responsive" alt="demo" src="http://placehold.it/300x200" />
                                    <div class="panel-body text-center">
                                        <p>Follower Name 2</p>
                                        <button className="btn btn-info"><i class="fa fa-plus"></i> Follow</button>
                                    </div>
                                </div>
                                <div class="panel panel-default follow-card">
                                    <img className="img-responsive" alt="demo" src="http://placehold.it/300x200" />
                                    <div class="panel-body text-center">
                                        <p>Follower Name 3</p>
                                        <button className="btn btn-info"><i class="fa fa-plus"></i> Follow</button>
                                    </div>
                                </div>
                                <div class="panel panel-default follow-card">
                                    <img className="img-responsive" alt="demo" src="http://placehold.it/300x200" />
                                    <div class="panel-body text-center">
                                        <p>Follower Name 4</p>
                                        <button className="btn btn-info"><i class="fa fa-plus"></i> Follow</button>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
        </div>
    );
};

export default Followers;