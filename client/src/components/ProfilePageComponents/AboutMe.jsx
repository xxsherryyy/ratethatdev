import React from "react";

const AboutMe = props => {
    
    return (
        <div className="w3-container w3-card w3-white w3-margin-bottom">
            <h2 className="w3-text-grey w3-padding-16"><i className="fa fa-user fa-fw w3-margin-right w3-xxlarge w3-text-indigo" />About</h2>
            <div className="w3-container">
                <p>{props.devContactInfo.aboutYou}</p>
                <hr className="hr"/>
            </div>
        </div>
    )


}

export default AboutMe;
