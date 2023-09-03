import React from 'react';
import videoFile from '../images/video.mp4';
import "./PhoneCard.css"

const PhoneCard = () => {
  return (
    <>
      <div className="temp-wrapper">
        <div className="px">
          <div className="px__body">
            <div className="px__body__cut"></div>
            <div className="px__body__speaker"></div>
            <div className="px__body__sensor"></div>

            <div className="px__body__mute"></div>
            <div className="px__body__up"></div>
            <div className="px__body__down"></div>
            <div className="px__body__right"></div>
          </div>

          <div className="px__screen">
            <div className="px__screen__">
              <div className="px__screen__frame">
                {videoFile ? (
                  <video
                    width="auto"
                    height="100%"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ marginLeft: '-3px' }}
                  >
                    <source src={videoFile} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  // Your fallback content here
                  <div className="fallback-content">
                    <i className="fa fa-apple"></i>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhoneCard;
