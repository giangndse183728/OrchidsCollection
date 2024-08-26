import React from 'react'
import { useEffect } from 'react';

export default function NotFound() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
  return (
    <>
    <div className="container-fluid h-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row">
        <div className="col-md-12 text-center">
          <img
            src="https://static-00.iconduck.com/assets.00/404-page-not-found-illustration-2048x998-yjzeuy4v.png"
            alt="404 Not Found"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
    </>
  )
}
