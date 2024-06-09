// import { USER } from "../models/user.js";

// const createUserValid = (req, res, next) => {
//   // TODO: Implement validatior for USER entity during creation
//   next();
// };

// const updateUserValid = (req, res, next) => {
//   // TODO: Implement validatior for user entity during update
//   next();
// };

// export { createUserValid, updateUserValid };


import { User } from "../models/user.js";

const createUserValid = (req, res, next) => {
    const { email, phoneNumber, password } = req.body;

    // Check for email uniqueness
    const existingUser = User.findOne({ email });
    if (existingUser) {
        return res.error("User with this email already exists");
    }

    // Check for phoneNumber uniqueness
    const existingPhoneNumber = User.findOne({ phoneNumber });
    if (existingPhoneNumber) {
        return res.error("User with this phone number already exists");
    }

    // Check password length
    if (password.length < 3) {
        return res.error("Password must be at least 3 characters long");
    }

    next();
};

const updateUserValid = (req, res, next) => {
    const { id } = req.params;
    const { email, phoneNumber, password } = req.body;

    // Check if any valid property is present
    if (!email && !phoneNumber && !password) {
        return res.error("At least one valid property must be present");
    }

    // Check for email uniqueness if provided
    if (email) {
        const existingUser = User.findOne({ email });
        if (existingUser && existingUser.id !== id) {
            return res.error("User with this email already exists");
        }
    }

    // Check for phoneNumber uniqueness if provided
    if (phoneNumber) {
        const existingPhoneNumber = User.findOne({ phoneNumber });
        if (existingPhoneNumber && existingPhoneNumber.id !== id) {
            return res.error("User with this phone number already exists");
        }
    }

    // Check password length if provided
    if (password && password.length < 3) {
        return res.error("Password must be at least 3 characters long");
    }

    next();
};

export { createUserValid, updateUserValid };

