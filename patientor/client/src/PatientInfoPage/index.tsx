import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react';

import EntryDetails from '../components/EntryDetails';
import { apiBaseUrl } from '../constants';
import { setPatient, useStateValue } from '../state';
import { Patient } from '../types';

const PatientInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

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
      {!patient.entries.length && (
        <div>
          <Icon name="warning sign" color="red" />{" "}
          No entries at the moment
        </div>
      )}
      {patient.entries.map(entry => (
        <EntryDetails
          key={entry.id}
          entry={entry}
        />
      ))}
    </div>
  );
};

export default PatientInfoPage;