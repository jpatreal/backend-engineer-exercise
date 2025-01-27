import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

enum ServiceEnum {
    DELIVERY = 'DELIVERY',
    PICKUP = 'PICKUP',
    PAYMENT = 'PAYMENT',
}

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public mobile!: string;
  public postcode!: string;
  public services!: ServiceEnum[];
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    services: {
        type: DataTypes.ARRAY(DataTypes.ENUM(...Object.values(ServiceEnum))),
        allowNull: false,
        defaultValue: [],
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;