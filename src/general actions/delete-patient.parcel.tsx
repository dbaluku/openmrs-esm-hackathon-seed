import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { Link, Route, BrowserRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";

function DeletePatientParcel(props: DeletePatientParcelProps) {
  const [patient, setPatient] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [deleteReason, setdeleteReason] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);

  const display_none = {
    display: "none"
  };
  const display_block = {
    display: "block"
  };

  const button_cancel = {
    padding: "8px 20px",
    background: "#ff3d3d",
    border: "#ff3d3d 1px solid",
    display: "inline-block",
    color: "white",
    cursor: "pointer",
    "max-width": "250px",
    "min-width": 0,
    "text-decoration": "none",
    "line-height": "1.2em"
  };

  const button_confirm = {
    border: "#88af28 1px solid",
    padding: "8px 20px",
    display: "inline-block",
    color: "white",
    cursor: "pointer",
    "min-width": 0,
    "max-width": "300px",
    "margin-right": "10px",
    background: "#88af28",
    "line-height": "1.2em",
    float: "right"
  };

  const modal_main = {
    position: "fixed",
    background: "white",
    width: "40%",
    height: "auto",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  };

  const modal = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.6)"
  };

  function showModal() {
    setShow(true);
  }

  function hideModal() {
    setShow(false);
  }

  React.useEffect(() => {
    const queryParams = `
      custom:(uuid,display,
      identifiers:(identifier,uuid,preferred,location:(uuid,name),
      identifierType:(uuid,name,format,formatDescription,validator)),
      person:(uuid,display,gender,birthdate,dead,age,deathDate,birthdateEstimated,
      causeOfDeath,preferredName:(uuid,preferred,givenName,middleName,familyName),
      attributes,preferredAddress:(uuid,preferred,address1,address2,cityVillage,longitude,
      stateProvince,latitude,country,postalCode,countyDistrict,address3,address4,address5
      ,address6)))
    `.replace(/\s/g, "");

    fetch(`/openmrs/ws/rest/v1/patient/${props.patientUuid}?v=${queryParams}`)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw Error(
            `Cannot fetch patient ${props.patientUuid} - server responded with '${resp.status}'`
          );
        }
      })
      .then(patient => {
        setPatient(patient);
      });
  }, []);

  React.useEffect(() => {
    if (isDeleting && deleteReason) {
      fetch(
        `/openmrs/ws/rest/v1/patient/${props.patientUuid}?reason=${deleteReason}`,
        {
          method: "DELETE"
        }
      )
        .then(resp => {
          if (resp.ok) {
            console.log("deleted patient");
            window.singleSpaNavigate("/openmrs/spa/patient-search");
          } else {
            throw Error(
              `Cannot delete patient ${props.patientUuid} - server responded with '${resp.status}'`
            );
          }
        })
        .then(patient => {
          setIsDeleting(false);
        });
    }
  }, [isDeleting, props.patientUuid, deleteReason]);

  return patient ? renderPatient() : renderLoader();

  function renderLoader() {
    return <div>Loading...</div>;
  }

  function renderPatient() {
    return (
      <div>
        <div style={show ? display_block : display_none}>
          <section style={modal_main}>
            <p style={{ background: "#00463f", color: "white" }}>
              Delete Patient: {patient.person.display}
            </p>
            <p>
              {" "}
              Are you sure you want to delete the patient{" "}
              {patient.person.display}
            </p>
            <form>
              <label>Reason:</label>
              <input
                type="text"
                value={deleteReason}
                onChange={pickDeleteReason}
              />
            </form>
            <button style={button_cancel} onClick={hideModal}>
              Close
            </button>
            <button style={button_confirm} onClick={onConfirm}>
              Confirm
            </button>
          </section>
        </div>

        <div>
          <BrowserRouter basename="">
            <Route>
              <Link onClick={showModal}>Delete patient </Link>
            </Route>
          </BrowserRouter>
        </div>
      </div>
    );
  }

  function pickDeleteReason(event) {
    setdeleteReason(event.target.value);
  }

  function onConfirm() {
    setIsDeleting(true);
  }

  function redirectToSearchPatient() {
    return <Redirect to="patient-search" />;
  }
}

type DeletePatientParcelProps = {
  patientUuid: string;
  patientName: string;
};

export default singleSpaReact({
  React,
  ReactDOM,
  rootComponent: DeletePatientParcel,
  suppressComponentDidCatchWarning: true
});
