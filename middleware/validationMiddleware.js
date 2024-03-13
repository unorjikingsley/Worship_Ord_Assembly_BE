import { body, param, validationResult } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customErrors.js';
import prisma from '../DB/db.config.js';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        const firstMessage = errorMessages[0];
        console.log(Object.getPrototypeOf(firstMessage));
        if (errorMessages[0].startsWith('Missing required')) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError('not authorized to access this route');
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateCommunityInput = withValidationErrors([
  body('first_Name').notEmpty().withMessage('Your first name is required'),
  body('last_Name').notEmpty().withMessage('Your last name is required'),
  body('email').notEmpty().withMessage('A valid email is required'),
]);

export const validateFirstTimerInput = withValidationErrors([
  body('first_Name').notEmpty().withMessage('Your first name is required'),
  body('last_Name').notEmpty().withMessage('Your last name is required'),
  body('email').notEmpty().withMessage('A valid email is required'),
  body('phone_Number').notEmpty().withMessage('Your phone number is required'),
]);

export const validatePrayerInput = withValidationErrors([
  body('first_Name').notEmpty().withMessage('Your first name is required'),
  body('last_Name').notEmpty().withMessage('Your last name is required'),
  body('email').notEmpty().withMessage('A valid email is required'),
  body('phone_Number').notEmpty().withMessage('Your phone number is required'),
  body('prayerRequest').notEmpty().withMessage('Please add prayer request'),
]);

export const validateTestimonyInput = withValidationErrors([
  body('first_Name').notEmpty().withMessage('Your first name is required'),
  body('last_Name').notEmpty().withMessage('Your last name is required'),
  body('email').notEmpty().withMessage('A valid email is required'),
  body('phone_Number').notEmpty().withMessage('Your phone number is required'),
  body('testimony').notEmpty().withMessage('Tell us more about your testimony'),
]);

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const testimony = await prisma.testimonyForm.findUnique({
      where: { id: parseInt(value) },
    })
    if (!testimony) throw new NotFoundError(`No testimony with id ${value}`)

    // const isAdmin = req.user.role === 'admin';
    // const isOwner = req.user.userId === job.createdBy.toString();

    // if (!isAdmin && !isOwner)
    //   throw new UnauthorizedError('not authorized to access this route');
  }),
])


// export const validateRegisterInput = withValidationErrors([
//   body('name').notEmpty().withMessage('name is required'),
//   body('email')
//     .notEmpty()
//     .withMessage('email is required')
//     .isEmail()
//     .withMessage('invalid email format')
//     .custom(async (email) => {
//       const user = await User.findOne({ email });
//       if (user) {
//         throw new BadRequestError('email already exists');
//       }
//     }),
//   body('password')
//     .notEmpty()
//     .withMessage('password is required')
//     .isLength({ min: 8 })
//     .withMessage('password must be at least 8 characters long'),
//   body('location').notEmpty().withMessage('location is required'),
//   body('lastName').notEmpty().withMessage('last name is required'),
// ]);

// export const validateLoginInput = withValidationErrors([
//   body('email')
//     .notEmpty()
//     .withMessage('email is required')
//     .isEmail()
//     .withMessage('invalid email format'),
//   body('password').notEmpty().withMessage('password is required'),
// ]);

// export const validateUpdateUserInput = withValidationErrors([
//   body('name').notEmpty().withMessage('name is required'),
//   body('email')
//     .notEmpty()
//     .withMessage('email is required')
//     .isEmail()
//     .withMessage('invalid email format')
//     .custom(async (email, { req }) => {
//       const user = await User.findOne({ email });
//       if (user && user._id.toString() !== req.user.userId) {
//         throw new BadRequestError('email already exists');
//       }
//     }),

//   body('location').notEmpty().withMessage('location is required'),
//   body('lastName').notEmpty().withMessage('last name is required'),
// ]);
