import User from '../models/user'
import bcryptjs from 'bcryptjs'

class UserService{
  
  async store (data) {
    
    data.password_hash = bcryptjs.hashSync(data.password, 8);
    return User.create(data);
  
  };

}

export default UserService;