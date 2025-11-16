import * as yup from 'yup';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf'];

// Profile Form Schema - All fields are optional except basic info
export const profileSchema = yup.object().shape({
  // Primary Information
  displayName: yup.string().min(2, 'Full Name must be at least 2 characters'),
  email: yup.string().email('Please enter a valid email address'),
  phone: yup.string().matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 'Please enter a valid phone number'),
  address: yup.string().min(10, 'Address must be at least 10 characters'),
  website: yup.string().url('Please enter a valid URL'),
  company: yup.string(),
  position: yup.string(),
  bio: yup.string(),

  // MSC Information (optional)
  mscInstitution: yup.string(),
  mscSubject: yup.string(),
  mscResult: yup.string(),
  mscPassingYear: yup.string().matches(/^\d{4}$|^$/, 'Passing Year must be a 4-digit number'),

  // BSC Information (optional)
  bscInstitution: yup.string(),
  bscSubject: yup.string(),
  bscResult: yup.string(),
  bscPassingYear: yup.string().matches(/^\d{4}$|^$/, 'Passing Year must be a 4-digit number'),

  // HSC Information (optional)
  hscInstitution: yup.string(),
  hscGroup: yup.string(),
  hscResult: yup.string(),
  hscPassingYear: yup.string().matches(/^\d{4}$|^$/, 'Passing Year must be a 4-digit number'),

  // SSC Information (optional)
  sscInstitution: yup.string(),
  sscGroup: yup.string(),
  sscResult: yup.string(),
  sscPassingYear: yup.string().matches(/^\d{4}$|^$/, 'Passing Year must be a 4-digit number'),

  // Documents (optional)
  mscDocument: yup
    .mixed<File>()
    .nullable()
    .test('fileSize', 'File too large (max 5MB)', (value) => !value || value.size <= MAX_FILE_SIZE)
    .test('fileFormat', 'Unsupported Format (PDF, JPG, PNG)', (value) => !value || SUPPORTED_FORMATS.includes(value.type)),
  bscDocument: yup
    .mixed<File>()
    .nullable()
    .test('fileSize', 'File too large (max 5MB)', (value) => !value || value.size <= MAX_FILE_SIZE)
    .test('fileFormat', 'Unsupported Format (PDF, JPG, PNG)', (value) => !value || SUPPORTED_FORMATS.includes(value.type)),
  hscDocument: yup
    .mixed<File>()
    .nullable()
    .test('fileSize', 'File too large (max 5MB)', (value) => !value || value.size <= MAX_FILE_SIZE)
    .test('fileFormat', 'Unsupported Format (PDF, JPG, PNG)', (value) => !value || SUPPORTED_FORMATS.includes(value.type)),
  sscDocument: yup
    .mixed<File>()
    .nullable()
    .test('fileSize', 'File too large (max 5MB)', (value) => !value || value.size <= MAX_FILE_SIZE)
    .test('fileFormat', 'Unsupported Format (PDF, JPG, PNG)', (value) => !value || SUPPORTED_FORMATS.includes(value.type)),
  passportDocument: yup
    .mixed<File>()
    .nullable()
    .test('fileSize', 'File too large (max 5MB)', (value) => !value || value.size <= MAX_FILE_SIZE)
    .test('fileFormat', 'Unsupported Format (PDF, JPG, PNG)', (value) => !value || SUPPORTED_FORMATS.includes(value.type)),
});

