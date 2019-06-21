import React from "react";
import { css } from "@emotion/core";
import Parcel from "single-spa-react/parcel";
import deletePatientParcel from "./delete-patient.parcel";
import MarkPatientAsDeceasedParcel from "./mark_patient_deceased.parcel";

// const generalActionsParcels = [
//   () => import("./delete-patient.parcel").then(m => m.default),
// ];

export default function GeneralActions(props: GeneralActionsProps) {
  return (
    <div
      css={css`
        margin: 76px auto 0 auto;
        width: 500px;
      `}
    >
      <Parcel
        config={deletePatientParcel}
        patientUuid={props.match.params.patientUuid}
      />

      <Parcel
        config={MarkPatientAsDeceasedParcel}
        patientUuid={props.match.params.patientUuid}
      />
    </div>
  );
}

type GeneralActionsProps = {
  match: {
    params: {
      patientUuid: string;
    };
  };
};
