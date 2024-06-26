// import { userRepository } from "../repositories/userRepository.js";

// class UserService {
//   // TODO: Implement methods to work with user

//   search(search) {
//     const item = userRepository.getOne(search);
//     if (!item) {
//       return null;
//     }
//     return item;
//   }
// }

// const userService = new UserService();

// export { userService };


import { userRepository } from "../repositories/userRepository.js";

class UserService {
  getAllUsers() {
    return userRepository.getAll();
  }

  getUserById(id) {
    return userRepository.getById(id);
  }

  createUser(user) {
    return userRepository.create(user);
  }

  updateUser(id, user) {
    return userRepository.update(id, user);
  }

  deleteUser(id) {
    return userRepository.delete(id);
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
