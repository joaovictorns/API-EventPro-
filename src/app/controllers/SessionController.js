import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, cpf, password } = req.body;

    // Check if the email or cpf was provided
    if (!email && !cpf) {
      return res.status(400).json({ error: 'Email or CPF is required to log in.' });
    }

    // Check if the CPF is valid (only numbers and exactly 11 digits)
    if (cpf) {
      const cpfRegex = /^\d{11}$/;

      if (!cpfRegex.test(cpf)) {
        return res.status(400).json({error: 'CPF must contain exactly 11 digits and only numbers.'});
      }
    }

    // Search for the user by email or CPF
    const user = await User.findOne({
      where: {
        [Sequelize.Op.or]: [
          { email: email ? email : null },
          { cpf: cpf ? cpf : null },
        ],
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'User does not exist.' });
    }

    // Check if the password is correct
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email: user.email, 
        cpf: user.cpf, 
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
