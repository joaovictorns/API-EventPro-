import User from '../models/User';
import * as Yup from 'yup';


class UserController {
  async store(req,res){

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password : Yup.string().required().min(6),
      type: Yup.string().required(),
      cpf: Yup.string().required(),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation failure.'})
    }
    
    // Check if an admin already exists
    if (req.body.type === 'admin') {
      const adminExist = await User.findOne({
        where: { type: 'admin' }
      });

      if (adminExist) {
        return res.status(400).json({ error: 'An admin user already exists.' });
      }
    }

    // checks if the user exists from the email created
    
    const userExist = await User.findOne({
      where: {email: req.body.email}
    });

    if(userExist){
      return res.status(400).json({error: 'User already exists.'})
    }

    const {id , name , email, type, cpf } = await User.create(req.body);

    return  res.json({
      id, 
      name,
      email,
      type,
      cpf,
    });
  }

// update user information

  async update(req,res){

   const schema = Yup.object().shape({
    name : Yup.string(),
    email: Yup.string().email(),
    oldPassword: Yup.string().min(6),
    password: Yup.string().min(6).when('oldPassword',(oldPassword,field) =>
      oldPassword ? field.required() : field 

    ),
    confirmPassword: Yup.string().when('password', (password,field) =>
    password ? field.required().oneOf([Yup.ref('password')]) : field

    ),
   }); 

   if(!(await schema.isValid(req.body))){
    return res.status(400).json({error: 'validation failure.'})
  }

    const {email, oldPassword} = req.body;

    const user = await User.findByPk(req.userId);

    // checks if the email the user is trying to log in to is the same as the one registered in the database
    if (email !== user.email){
      const userExist = await User.findOne({
        where: {email},
      });
  
      if(userExist){
        return res.status(400).json({error: 'User already exists.'})
      }
    }

    // checks if it is the same as the old password registered in the database and if not, an error is returned
    if (oldPassword && !(await user.checkPassword(oldPassword))){
      return res.status(401).json({error: 'Password is incorrect'});
    }

    const {id , name} = await user.update(req.body);

  return res.json({
    id,
    name,
    email,
  });
  }

  async delete(req, res) {
    const userRequestingDeletion = await User.findByPk(req.userId); 

   // Checks if the user trying to delete is an admin
    if (userRequestingDeletion.type !== 'admin') {
      return res.status(403).json({ error: 'Only admin can delete users.' });
    }
    // ID of the user to be deleted
    const { id } = req.params; 

    // Prevents the admin from being deleted
    const userToDelete = await User.findByPk(id);
    if (userToDelete.type === 'admin') {
      return res.status(403).json({ error: 'Admin users cannot be deleted.' });
    }

    // Delete the user
    await userToDelete.destroy();

    return res.status(200).json({ message: 'User deleted successfully.' });
  }
}
export default new UserController();
// OBS: Usar esta mesma estrutura para os eventos.