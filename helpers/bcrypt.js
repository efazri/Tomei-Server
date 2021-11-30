const bcrypt = require('bcrypt');

function hassPass(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, parseInt(salt, 10));
}

function comparePass(password, hassPassword) {
  return bcrypt.compareSync(password, hassPassword); // true
}

module.exports = { comparePass, hassPass }; //
