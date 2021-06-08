import React from "react";
import "./form.styles.css";

const Form = (props) => {

  return (
    <div className="container">
     
        <div> {props.form_city === "" || props.form_country ==="" ? (!props.celsius ? props.error ? error() : null : null) : 
        (props.celsius ? ( props.form_city === "" || props.form_country ==="" && !props.error ? error() :null) : null) }</div>
     <form onSubmit={props.loadWeather} >
 
     <div className="row">
        <div className="col-md-3 offset-md-2">
          <input
            type="text"
            className="form-control"
            name="city"
            autoComplete="off"
            placeholder='City'
            onChange={(e) => {
                console.log("e in form city ",e.target.value)
                props.setCity(e.target.value)}}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            name="country"
            autoComplete="off"
            placeholder='Country'
            onChange={(e) => {
                props.setCity(e.target.value)}}
          />
        </div>
        <div className="col-md-3 mt-md-0 text-md-left">
          <button className="btn btn-warning">Get Weather</button>
        </div>
      </div>
     </form>
    </div>
  );
};


function error(){
    return(
        <div className="alert alert-danger mx-5" role="alert"> 
        Please enter city and country</div>
    )
}
export default Form;
