const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "account_types", deps: []
 * createTable() => "clients", deps: []
 * createTable() => "transactions", deps: []
 * createTable() => "transactions_types", deps: []
 * createTable() => "accounts", deps: [account_types]
 *
 */

const info = {
  revision: 1,
  name: "account_types",
  created: "2021-04-24T19:22:04.815Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "account_types",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name" },
        description: { type: Sequelize.STRING, field: "description" },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "clients",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        first_name: { type: Sequelize.STRING, field: "first_name" },
        description: { type: Sequelize.STRING, field: "description" },
        last_name: { type: Sequelize.STRING, field: "last_name" },
        email: { type: Sequelize.STRING, field: "email" },
        telephone: { type: Sequelize.STRING, field: "telephone" },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "transactions",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        account_ori: { type: Sequelize.INTEGER, field: "account_ori" },
        account_des: { type: Sequelize.INTEGER, field: "account_des" },
        amount: { type: Sequelize.INTEGER, field: "amount" },
        transaction_type: {
          type: Sequelize.INTEGER,
          field: "transaction_type",
        },
        trans_date: { type: Sequelize.DATE, field: "trans_date" },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "transactions_types",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name" },
        description: { type: Sequelize.STRING, field: "description" },
        type: { type: Sequelize.INTEGER, field: "type" },
        transaction__type: {
          type: Sequelize.INTEGER,
          field: "transaction__type",
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "accounts",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        account_no: { type: Sequelize.INTEGER, field: "account_no" },
        client_id: { type: Sequelize.INTEGER, field: "client_id" },
        balance: { type: Sequelize.DECIMAL, field: "balance" },
        type: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "account_types", key: "id" },
          allowNull: true,
          field: "type",
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["account_types", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["accounts", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["clients", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["transactions", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["transactions_types", { transaction }],
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
