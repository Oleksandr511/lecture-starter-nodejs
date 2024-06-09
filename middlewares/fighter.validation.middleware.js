// import { FIGHTER } from "../models/fighter.js";

// const createFighterValid = (req, res, next) => {
//   // TODO: Implement validatior for FIGHTER entity during creation


//   next();
// };

// const updateFighterValid = (req, res, next) => {
//   // TODO: Implement validatior for FIGHTER entity during update

//   next();
// };

// export { createFighterValid, updateFighterValid };

import { Fighter } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
    const { name, power, defense, health } = req.body;

    // Check for required fields
    if (!name || !power || !defense) {
        return res.error("Name, power, and defense are required");
    }

    // Check for name uniqueness
    const existingFighter = Fighter.findOne({ name });
    if (existingFighter) {
        return res.error("Fighter with this name already exists");
    }

    // Validate power and defense
    if (power < 1 || power > 100 || defense < 1 || defense > 10) {
        return res.error("Power must be between 1 and 100, and defense between 1 and 10");
    }

    // Validate health if provided
    if (health && (health < 80 || health > 120)) {
        return res.error("Health must be between 80 and 120");
    }

    next();
};

const updateFighterValid = (req, res, next) => {
    const { id } = req.params;
    const { name, power, defense, health } = req.body;

    // Check if any valid property is present
    if (!name && !power && !defense && !health) {
        return res.error("At least one valid property must be present");
    }

    // Check for name uniqueness if provided
    if (name) {
        const existingFighter = Fighter.findOne({ name });
        if (existingFighter && existingFighter.id !== id) {
            return res.error("Fighter with this name already exists");
        }
    }

    // Validate power and defense if provided
    if ((power && (power < 1 || power > 100)) || (defense && (defense < 1 || defense > 10))) {
        return res.error("Power must be between 1 and 100, and defense between 1 and 10");
    }

    // Validate health if provided
    if (health && (health < 80 || health > 120)) {
        return res.error("Health must be between 80 and 120");
    }

    next();
};

export { createFighterValid, updateFighterValid };
