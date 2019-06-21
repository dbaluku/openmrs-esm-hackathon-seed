import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { Link, Route, BrowserRouter } from "react-router-dom";

function MarkPatientAsDeceasedParcel(props: MarkPatientAsDeceasedParcelProps) {
  const [patient, setPatient] = React.useState(null);

  return props.patientUuid ? renderDeceasedLink() : renderLoader();

  function renderLoader() {
    return <div>Loading...</div>;
  }

  function renderDeceasedLink() {
    let coreAppsLink = `/coreapps/markPatientDead.page?patientId=${props.patientUuid}`;
    return (
      <div>
        <div>
          <BrowserRouter basename="/openmrs">
            <Route>
              <Link to={coreAppsLink}>Mark Patient As Deceased </Link>
            </Route>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

type MarkPatientAsDeceasedParcelProps = {
  patientUuid: string;
};

export default singleSpaReact({
  React,
  ReactDOM,
  rootComponent: MarkPatientAsDeceasedParcel,
  suppressComponentDidCatchWarning: true
});
