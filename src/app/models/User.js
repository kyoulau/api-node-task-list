import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
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
    });
    return this;
  }
  checkPassword(password) {
    if (!password || !this.password_hash) {
      throw new Error("User or password_hash is null or undefined");
    }

    try {
      return bcrypt.compare(password, this.password_hash);
    } catch (error) {
      throw new Error("Error comparing password", { cause: error });
    }
  }
}

export default User;