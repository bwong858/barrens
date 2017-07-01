const dummyChannels = [
  {
    name: 'General',
    id: 0,
    users: [0, 1, 2]
  },
  {
    name: 'Events',
    id: 1,
    users: [5, 6, 7]
  },
  {
    name: 'Trade',
    id: 2,
    users: [10, 11, 12]
  }
];

const dummyMessages = [
  {
    id: 0,
    username: 'theBob',
    text: 'Sups',
    region: 'SF',
    channel: 'General',
    timestamp: 1498888596867
  },
  {
    id: 1,
    username: 'notBob',
    text: 'Nups',
    region: 'Marin',
    channel: 'Trade',
    timestamp: 1498888596867
  },
  {
    id: 2,
    username: 'someBob',
    text: 'Pups',
    region: 'Market St',
    channel: 'General',
    timestamp: 1498888596867
  }
];

const dummyUsers = [
  {
    id: 0,
    name: 'test',
  },
  {
    id: 1,
    name: 'something'
  },
  {
    id: 2,
    name: 'icles'
  }
];

module.exports = {
  dummyChannels,
  dummyMessages,
  dummyUsers
};
