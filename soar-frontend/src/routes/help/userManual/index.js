import React from 'react';
import PDF from 'assets/files/CIKMS_HELP.pdf';

/**
 * Renders a user manual component that displays a PDF document.
 */
const UserManual = () => {
  return (
    <div>
      <embed
        src={PDF + '#toolbar=0'}
        type='application/pdf'
        height={800}
        width={'100%'}
      />
    </div>
  );
};

export default UserManual;
