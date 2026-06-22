//example code for zod validation schemas, to be replaced with actual validation schemas


/**
 * import {z} from 'zod';
export const phoneNumberSchema = z.object({
  phoneNumber: z
    .string()
    .nonempty({message: 'Enter a valid phone number'})
    .min(10, {message: 'Please enter a valid phone number'})
    .max(10, {message: 'Please enter a valid phone number'}),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .nonempty({message: 'OTP is required.'})
    .min(6, {message: 'Please enter 6 digits OTP.'})
    .max(10, {message: 'Please enter 6 digits OTP.'})
    .refine(val => !isNaN(Number(val)), {
      message: 'Please enter 6 digits OTP.',
    }),
});

export const onBoardingProfileSchema = z.object({
  fullName: z.string().nonempty({message: 'Name is required'}),
  email: z
    .string()
    .nonempty({message: 'Enter a valid email address'})
    .email({message: 'Please enter a valid email address'}),
});

export type phoneNumberFormDataType = z.infer<typeof phoneNumberSchema>;
export type otpFormDataType = z.infer<typeof otpSchema>;
export type onBoardingProfileFormDataType = z.infer<
  typeof onBoardingProfileSchema
>;

 */