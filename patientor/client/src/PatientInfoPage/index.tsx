import React from "react";
import { Header, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useStateValue, setPatient } from "../state";
import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

const PatientInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient, diagnoses }, dispatch] = useStateValue();

  React.useEffect(() => {
    if (patient && patient.id === id) {
      return;
    }

    const fetchPatient = async () => {
      try {
        const { data: patientById } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientById));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  // eslint-disable-next-line
  }, [id, dispatch]);

  if (!patient) {
    return <div>Patient not found!</div>;
  }

  return (
    <div>
      <Header as="h2">
        {patient.name}
        <Icon
          name={patient.gender === "male"
            ? "mars"
            : patient.gender === "female"
              ? "venus"
              : "other gender"}
        />
      </Header>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <Header as="h3">entries</Header>
      {patient.entries.map(entry => (
        <div key={entry.id}>
          <p>{entry.date} {entry.description}</p>
          <ul>
            {entry.diagnosisCodes?.map(code => (
              <li key={code}>{code} {diagnoses[code].name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientInfoPage;