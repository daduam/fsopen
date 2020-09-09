import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Header, Icon } from 'semantic-ui-react';

import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import EntryDetails from '../components/EntryDetails';
import { apiBaseUrl } from '../constants';
import { setPatient, useStateValue } from '../state';
import { Patient } from '../types';

const PatientInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

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

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(setPatient(updatedPatient));
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
      {!patient.entries.length && (
        <div>
          <Icon name="warning sign" color="red" />{" "}
          No entries at the moment
        </div>
      )}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
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