import React from "react";
import GeneralActions from "./general actions/general-actions";
import { BrowserRouter, Route } from "react-router-dom";

export default function Root(props: RootProps) {
  return (
    <BrowserRouter basename="/openmrs/spa">
      <Route
        path="/patient-dashboard/:patientUuid"
        component={GeneralActions}
      />
    </BrowserRouter>
  );
}

type RootProps = {};
