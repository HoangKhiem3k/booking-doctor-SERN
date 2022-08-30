("use strict");

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let passwordHash = bcrypt.hashSync("1234", bcrypt.genSaltSync(10));
    return queryInterface.bulkInsert("Users", [
      {
        email: "admin@gmail.com",
        password: passwordHash,
        firstName: "Khiem",
        lastName: "Le",
        address: "Da Nang",
        gender: 1,
        roleId: "r1",
        phoneNumber: "0348597672",
        image: "",
        positionId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
