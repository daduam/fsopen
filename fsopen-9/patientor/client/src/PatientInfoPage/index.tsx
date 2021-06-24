import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

import AddEntryModal from '../AddEntryModal';
import EntryDetails from '../components/EntryDetails';
import { apiBaseUrl } from '../constants';
import { addEntry, setPatient, useStateValue } from '../state';
import { Entry, Patient } from '../types';

const PatientInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [entryType, setEntryType] = React.useState<Entry["type"]>("HealthCheck");

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

  const openModal = (type: Entry["type"]): void => {
    setModalOpen(true);
    setEntryType(type);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: Omit<Entry, "id">) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeModal();
    } catch(e) {
      setError(e.response.data.error);
    }
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        type={entryType}
      />
      <Segment>
        <Header>Add new entry</Header>
        <Button onClick={() => openModal("Hospital")}>Hospital Entry</Button>
        <Button onClick={() => openModal("HealthCheck")}>Health Check Entry</Button>
        <Button onClick={() => openModal("OccupationalHealthcare")}>Occupational Healthcare Entry</Button>
      </Segment>
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