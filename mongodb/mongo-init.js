db = db.getSiblingDB('bitcore');

db.createUser({
  user: 'bitcore',
  pwd: 'bitcore',
  roles: [{ role: 'readWrite', db: 'bitcore' }],
});
