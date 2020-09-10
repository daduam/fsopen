import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';

import { Entry } from '../types';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import HospitalEntryForm from './HospitalEntryForm';
import OccupationalHealthCareEntryForm from './OccupationalHealthCareEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Omit<Entry, "id">) => void;
  error?: string;
  type: Entry["type"];
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, type }: Props) => {
  let entryForm = null;
  switch(type) {
    case "HealthCheck":
      entryForm = <HealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />;
      break;
    case "Hospital":
      entryForm = <HospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />;
      break;
    case "OccupationalHealthcare":
      entryForm = <OccupationalHealthCareEntryForm onSubmit={onSubmit} onCancel={onClose} />;
      break;
    default:
      entryForm = null;
  }

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && (
          <Segment inverted color="red">
            {`Error: ${error}`}
          </Segment>
        )}
        {entryForm}
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
