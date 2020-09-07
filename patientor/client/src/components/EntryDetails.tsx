import React from 'react';
import { Card, Icon, IconProps, Label } from 'semantic-ui-react';

import { useStateValue } from '../state';
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthCareEntry, HealthCheckRating } from '../types';
import { assertNever } from '../utils';

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Card fluid>
      <Card.Content>
        <Card.Description>
          <Label>
            <Icon name="hospital outline" />
            HOSPITAL{" "}
          </Label>
          {entry.description}
        </Card.Description>
        <Card.Meta>{entry.date}</Card.Meta>
      </Card.Content>
      {entry.diagnosisCodes && (
        <Card.Content>
          <Card.Header>Diagnoses</Card.Header>
          <ul>
            {entry.diagnosisCodes?.map(code => (
              <li key={code}>{code} {diagnoses[code]?.name}</li>
            ))}
          </ul>
        </Card.Content>
      )}
      <Card.Content>
        <Card.Header>Discharge</Card.Header>
        <Card.Meta>{entry.discharge.date}</Card.Meta>
        <Card.Description>{entry.discharge.criteria}</Card.Description>
      </Card.Content>
    </Card>
  );
};

const OccupationalHealthCareEntryDetails: React.FC<{
  entry: OccupationalHealthCareEntry;
}> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Card fluid>
      <Card.Content>
        <Card.Description>
          <Label>
            <Icon name="stethoscope" />
            OCCUPATIONAL{" "}
          </Label>
          {entry.description}
        </Card.Description>
        <Card.Meta>{entry.date}</Card.Meta>
      </Card.Content>
      {entry.diagnosisCodes && (
        <Card.Content>
          <Card.Header>Diagnoses</Card.Header>
          <ul>
            {entry.diagnosisCodes?.map(code => (
              <li key={code}>{code} {diagnoses[code]?.name}</li>
            ))}
          </ul>
        </Card.Content>
      )}
      <Card.Content>
        <Card.Description>Employer: {entry.employerName}</Card.Description>
        {entry.sickLeave && (
          <Card.Meta>
            Has sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
          </Card.Meta>
        )}
      </Card.Content>
    </Card>
  );
};

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  let ratingColor: IconProps["color"];
  switch (entry.healthCheckRating) {
    case 0:
      ratingColor = "green";
      break;
    case 1:
      ratingColor = "olive";
      break;
    case 2:
      ratingColor = "orange";
      break;
    default:
      ratingColor = "red";
  }

  return (
    <Card fluid>
      <Card.Content>
        <Card.Description>
          <Label>
            <Icon name="doctor" />
            HEALTH CHECK{" "}
          </Label>
          {entry.description}
        </Card.Description>
        <Card.Meta>{entry.date}</Card.Meta>
      </Card.Content>
      {entry.diagnosisCodes && (
        <Card.Content>
          <Card.Header>Diagnoses</Card.Header>
          <ul>
            {entry.diagnosisCodes?.map(code => (
              <li key={code}>{code} {diagnoses[code]?.name}</li>
            ))}
          </ul>
        </Card.Content>
      )}
      <Card.Content>
        Health Check Rating{" "}
        <Label color={ratingColor}>
          <Icon name="heart" />
          {HealthCheckRating[entry.healthCheckRating]}
        </Label>
      </Card.Content>
    </Card>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthCareEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;