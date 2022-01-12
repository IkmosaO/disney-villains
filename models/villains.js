const villainsModel = (connection, Sequelize) => {
  return connection.define('villainsTables', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING, allowNull: false },
    movie: { type: Sequelize.STRING, allowNull: false },
    slug: { type: Sequelize.STRING, allowNull: false }
  }, { paranoid: true })
}

module.exports = villainsModel
