const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn(updated_at) => "clients"
 * addColumn(created_at) => "clients"
 *
 */

const info = {
  revision: 2,
  name: "clients_create_update",
  created: "2021-04-24T19:26:22.775Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "clients",
      "updated_at",
      { type: Sequelize.DATE, field: "updated_at", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "clients",
      "created_at",
      { type: Sequelize.DATE, field: "created_at", allowNull: false },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["clients", "updated_at", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["clients", "created_at", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (this.useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
