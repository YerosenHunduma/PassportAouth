const bcrypt = require("bcrypt");

const hashedPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedP = await bcrypt.hash(password, salt);
    return {
      salt: salt,
      hash: hashedP,
    };
  } catch (error) {
    throw error;
  }
};

module.exports.hashedPassword = hashedPassword;
