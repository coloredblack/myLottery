export function generateCandidates(n) {
  let candidateList = [];
  for (let i = 0; i < n; i++) {
    candidateList.push(i);
  }
  return candidateList;
}

function shuffle(list) {
  let c = [...list];
  for (let i = c.length; i > 0; i--) {
    const pIdx = Math.floor(Math.random() * i);
    [c[pIdx], c[i - 1]] = [c[i - 1], c[pIdx]];
  }
  return c;
}

export function getLuckies(candidateList, prizeNum) {
  //shuffle the candidate list and get the upper prizeNum candidates as Lucky men
  let shufRes = shuffle(candidateList);
  return shufRes.filter((item, id) => {
    return id < prizeNum;
  })
}