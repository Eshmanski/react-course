import React from 'react';

const About = () => {

  return (
    <div className="container py-4">
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Информация</h1>
          <p className="col-md-8 fs-4">Версия приложения: <strong>1.0.0</strong></p>
          {/* <button className="btn btn-primary btn-lg" type="button">Example button</button> */}
        </div>
      </div>
    </div>
  );
}

export default About;
