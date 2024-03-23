import { DateTime } from 'luxon';
import { type ReactElement } from 'react';

export const Education = (): ReactElement => {
  const COLLEGES = [
    {
      name: 'Azerbaijan State Oil and Industry University',
      major: 'Artificial Intelligence',
      degree: "Master's",
      startYear: DateTime.fromISO('2022'),
      endYear: DateTime.fromISO('')
    },
    {
      name: 'Azerbaijan State Oil and Industry University',
      major: 'Computer Engineering',
      degree: "Bachelor's",
      startYear: DateTime.fromISO('2018'),
      endYear: DateTime.fromISO('2022')
    }
  ];

  return (
    <div id='education' className='preview-section'>
      <h1>EDUCATION</h1>

      {COLLEGES.map((college, index) => (
        <div key={index}>
          <span>
            <h2>{college.name}</h2>
            <h3>
              {college.startYear.year} - {college.endYear.year || 'Present'}
            </h3>
          </span>

          <p>
            {college.major} {college.degree}
          </p>
        </div>
      ))}
    </div>
  );
};
