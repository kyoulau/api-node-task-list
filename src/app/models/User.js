import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: {
          type: Sequelize.VIRTUAL,
          allowNull: false,
        },
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    this.addHook("beforeSave", (user) => {
      if(user.password) {
        user.password_hash = bcrypt.hashSync(user.password, 8);
      }
    })
  };
}

export default User;