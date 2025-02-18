import { body, param, ValidationChain } from "express-validator";



export const validateIdParam: ValidationChain[] = [
    param("id")
    .notEmpty() 
    .withMessage("ID is required")
    .isString()
    .withMessage("ID must be a string")
  ];

export const createLaunchpadValidator: ValidationChain[] = [
  body("id")
    .notEmpty()
    .withMessage("ID is required")
    .isString()
    .withMessage("ID must be a string"),

  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  body("full_name")
    .notEmpty()
    .withMessage("Full Name is required")
    .isString()
    .withMessage("Full Name must be a string"),

  body("locality")
    .optional()
    .isString()
    .withMessage("Locality must be a string")
    .trim(),

  body("latitude")
    .optional()
    .isDecimal()
    .withMessage("Latitude must be a decimal"),

  body("longitude")
    .optional()
    .isDecimal()
    .withMessage("Longitude must be a decimal"),

    body("launch_attempts")
    .optional()
    .isInt()
    .withMessage("Launch Attempts must be an integer"),

    body("launch_successes")
    .optional()
    .isInt()
    .withMessage("Launch Successes must be an integer"),

    body("rockets")
    .optional()
    .isArray()
    .withMessage("Rockets must be an array"),

    body('timezone')
    .optional()
    .isString()
    .withMessage('Timezone must be a string'),

    body('status')
    .optional()
    .isString()
    .withMessage('Status must be a string')
    .isIn(['active', 'retired', 'under construction'])
    .withMessage('Status must be active, retired, or under construction'),

    body('details')
    .optional()
    .isString()
    .withMessage('Details must be a string'),

    body('images')
    .optional()
    .isObject()
    .withMessage('Images must be an object'),

    body('images.large')
    .optional()
    .isString()
    .withMessage('Large image must be a string')
    .isURL()
    .withMessage('Large image must be a URL'),

    body('launches')
    .optional()
    .isArray()
    .withMessage('Launches must be an array')

];

export const updateLaunchpadValidator: ValidationChain[] = [
    body("name")
        .optional()
        .isString()
        .withMessage("Name must be a string"),
    
    body("full_name")
        .optional()
        .isString()
        .withMessage("Full Name must be a string"),
    
    body("locality")
        .optional()
        .isString()
        .withMessage("Locality must be a string")
        .trim(),
    
    body("latitude")
        .optional()
        .isDecimal()
        .withMessage("Latitude must be a decimal"),
    
    body("longitude")
        .optional()
        .isDecimal()
        .withMessage("Longitude must be a decimal"),
    
        body("launch_attempts")
        .optional()
        .isInt()
        .withMessage("Launch Attempts must be an integer"),
    
        body("launch_successes")
        .optional()
        .isInt()
        .withMessage("Launch Successes must be an integer"),
    
        body("rockets")
        .optional()
        .isArray()
        .withMessage("Rockets must be an array"),
    
        body('timezone')
        .optional()
        .isString()
        .withMessage('Timezone must be a string'),
    
        body('status')
        .optional()
        .isString()
        .withMessage('Status must be a string')
        .isIn(['active', 'retired', 'under construction'])
        .withMessage('Status must be active, retired, or under construction'),
    
        body('details')
        .optional()
        .isString()
        .withMessage('Details must be a string'),
    
        body('images')
        .optional()
        .isObject()
        .withMessage('Images must be an object'),
    
        body('images.large')
        .optional()
        .isString()
        .withMessage('Large image must be a string')
        .isURL()
        .withMessage('Large image must be a URL'),
    
        body('launches')
        .optional()
        .isArray()
        .withMessage('Launches must be an array')
];

export const deleteLaunchpadValidator: ValidationChain[] = [
    param("id")
        .notEmpty()
        .withMessage("ID is required")
        .isString()
        .withMessage("ID must be a string")
];

