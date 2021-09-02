import React from 'react';
import { generateCandidates } from '../utils';

import { generateCandidates } from '../../../scripts/candidates';

const AddCandidateBtn = (props) => {
  const handleGetCandidate = () => {
    let candidatesList = generateCandidates(100);
    props.setCandidatesList(candidatesList);
  }
  return (
    <button onClick={ handleGetCandidate}>Get Candidates</button>
  )
}

export default AddCandidateBtn;