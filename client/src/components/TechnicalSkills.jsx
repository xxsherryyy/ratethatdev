import Auth from '../modules/Auth';
//import Dashboard from '../components/Dashboard.jsx';
//import SelfSurveyForm from '../components/SelfSurveyForm.jsx';
import React, { Component } from "react";





const TechnicalSkills = props => (

   
            <div>
                <h1>{props.title}</h1>
                {/* {console.log(props.skills[0])} */}
                    
                    {/* {props.skills.map(skill => <li>{skill.tag} {skill.points}</li>)} */}

                    {props.skills.map(skill => ( 
                        <ul key={skill._id}>
                            <p>{skill.tag}</p>
                            <div className="w3-light-grey w3-round-xlarge w3-small">
                                <div className="w3-container w3-center w3-round-xlarge w3-indigo" style={{width: skill.points}}>{skill.points}</div>
                            </div>
                        </ul>
                    ))}
            </div>            
    
);

export default TechnicalSkills;