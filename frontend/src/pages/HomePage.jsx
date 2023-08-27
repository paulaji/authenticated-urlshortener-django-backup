import React from "react";

const HomePage = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">This is the Homepage!</h3>
              <p className="card-text">Django-React | JWT | Authenticator</p>
              <hr />
              <small>
                django-react jwt authenticator -{" "}
                <a
                  href="https://github.com/paulaji/authenticated-urlshortener-django"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  source code
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
