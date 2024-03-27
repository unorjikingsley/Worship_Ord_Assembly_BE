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

export const validateMessageInput = withValidationErrors([
  body('Topic').notEmpty().withMessage('Topic is required'),
  body('sub_Topic').notEmpty().withMessage('Sub topic is required'),
  body('minister').notEmpty().withMessage('Minister is required'),
  body('duration')
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive integer'),
  body('message').notEmpty().withMessage('Message is required'),
  body('link')
    .optional({ nullable: true })
    .isURL()
    .withMessage('Invalid URL format'),
])

export const validateEventsInput = withValidationErrors([
  body('type').notEmpty().withMessage('Input the type of service'),
  body('date').notEmpty().withMessage('Date is required'),
  body('time').notEmpty().withMessage('Time estimation is required'),
  body('address').notEmpty().withMessage('Input Physical location'),
])

export const validateWOACommunityInput = withValidationErrors([
  body('full_Name').notEmpty().withMessage('Full name is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  body('phone_Number')
    .optional({ nullable: true })
    .isMobilePhone('any')
    .withMessage('Invalid phone number format'),
  // body('communities')
  //   .notEmpty()
  //   .withMessage('Community status is required')
  //   .isIn([
  //     'MarriageCounsellingWorkshop',
  //     'YouthProgramsAndCommunities',
  //     'KidsProgram',
  //     'MenMinistry',
  //     'YouthLeader',
  //     'TrybeTeam',
  //   ])
  //   .withMessage('Invalid community status'),
  body('reasons')
    .optional({ nullable: true })
    .isString()
    .withMessage('Reasons must be a string'),
])


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

export const validateMessageIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const message = await prisma.message.findUnique({
      where: { id: parseInt(value) },
    })
    if (!message) throw new NotFoundError(`No message with id ${value}`)

    // const isAdmin = req.user.role === 'admin';
    // const isOwner = req.user.userId === job.createdBy.toString();

    // if (!isAdmin && !isOwner)
    //   throw new UnauthorizedError('not authorized to access this route');
  }),
])

export const validateEventIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const event = await prisma.events.findUnique({
      where: { id: parseInt(value) },
    })
    if (!event) throw new NotFoundError(`No event with id ${value}`)

    // const isAdmin = req.user.role === 'admin';
    // const isOwner = req.user.userId === job.createdBy.toString();

    // if (!isAdmin && !isOwner)
    //   throw new UnauthorizedError('not authorized to access this route');
  }),
])

export const validateContactUsInput = withValidationErrors([
  body('first_Name').notEmpty().withMessage('Your first name is required'),
  body('last_Name').notEmpty().withMessage('Your last name is required'),
  body('email').notEmpty().withMessage('A valid email is required'),
  body('phone_Number').notEmpty().withMessage('A valid phone number is required'),
  body('descriptions').notEmpty().withMessage('Please write us a message'),
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
