import * as yup from 'yup';

// Application Form Validation Schema
export const applicationFormSchema = yup.object().shape({
  // Primary Information
  displayName: yup
    .string()
    .required('Full Name is required')
    .min(2, 'Full Name must be at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 'Please enter a valid phone number'),
  address: yup
    .string()
    .required('Address is required')
    .min(10, 'Address must be at least 10 characters'),

  // BSC Information
  bscInstitution: yup
    .string()
    .required('BSC Institution is required'),
  bscSubject: yup
    .string()
    .required('BSC Subject is required'),
  bscResult: yup
    .string()
    .required('BSC Result is required'),
  bscPassingYear: yup
    .string()
    .required('BSC Passing Year is required')
    .matches(/^\d{4}$/, 'Please enter a valid year (e.g., 2020)'),

  // HSC Information
  hscInstitution: yup
    .string()
    .required('HSC Institution is required'),
  hscGroup: yup
    .string()
    .required('HSC Group is required'),
  hscResult: yup
    .string()
    .required('HSC Result is required'),
  hscPassingYear: yup
    .string()
    .required('HSC Passing Year is required')
    .matches(/^\d{4}$/, 'Please enter a valid year (e.g., 2018)'),

  // SSC Information
  sscInstitution: yup
    .string()
    .required('SSC Institution is required'),
  sscGroup: yup
    .string()
    .required('SSC Group is required'),
  sscResult: yup
    .string()
    .required('SSC Result is required'),
  sscPassingYear: yup
    .string()
    .required('SSC Passing Year is required')
    .matches(/^\d{4}$/, 'Please enter a valid year (e.g., 2016)'),

  // Documents
  bscDocument: yup
    .mixed<File>()
    .nullable()
    .required('BSC Certificate is required')
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      if (!value) return false;
      return (value as File).size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Only PDF, JPG, PNG files are allowed', (value) => {
      if (!value) return false;
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      return validTypes.includes((value as File).type);
    }) as yup.Schema<File | null>,
  hscDocument: yup
    .mixed<File>()
    .nullable()
    .required('HSC Certificate is required')
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      if (!value) return false;
      return (value as File).size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Only PDF, JPG, PNG files are allowed', (value) => {
      if (!value) return false;
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      return validTypes.includes((value as File).type);
    }) as yup.Schema<File | null>,
  sscDocument: yup
    .mixed<File>()
    .nullable()
    .required('SSC Certificate is required')
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      if (!value) return false;
      return (value as File).size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Only PDF, JPG, PNG files are allowed', (value) => {
      if (!value) return false;
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      return validTypes.includes((value as File).type);
    }) as yup.Schema<File | null>,
  passportDocument: yup
    .mixed<File>()
    .nullable()
    .required('Passport is required')
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      if (!value) return false;
      return (value as File).size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Only PDF, JPG, PNG files are allowed', (value) => {
      if (!value) return false;
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      return validTypes.includes((value as File).type);
    }) as yup.Schema<File | null>,
});

// Schema for Primary Information Tab
export const primaryInformationSchema = yup.object().shape({
  displayName: yup
    .string()
    .required('Full Name is required')
    .min(2, 'Full Name must be at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 'Please enter a valid phone number'),
  address: yup
    .string()
    .required('Address is required')
    .min(10, 'Address must be at least 10 characters'),
});

// Schema for Academic Information Tab
export const academicInformationSchema = yup.object().shape({
  bscInstitution: yup
    .string()
    .required('BSC Institution is required'),
  bscSubject: yup
    .string()
    .required('BSC Subject is required'),
  bscResult: yup
    .string()
    .required('BSC Result is required'),
  bscPassingYear: yup
    .string()
    .required('BSC Passing Year is required')
    .matches(/^\d{4}$/, 'Please enter a valid year (e.g., 2020)'),
  hscInstitution: yup
    .string()
    .required('HSC Institution is required'),
  hscGroup: yup
    .string()
    .required('HSC Group is required'),
  hscResult: yup
    .string()
    .required('HSC Result is required'),
  hscPassingYear: yup
    .string()
    .required('HSC Passing Year is required')
    .matches(/^\d{4}$/, 'Please enter a valid year (e.g., 2018)'),
  sscInstitution: yup
    .string()
    .required('SSC Institution is required'),
  sscGroup: yup
    .string()
    .required('SSC Group is required'),
  sscResult: yup
    .string()
    .required('SSC Result is required'),
  sscPassingYear: yup
    .string()
    .required('SSC Passing Year is required')
    .matches(/^\d{4}$/, 'Please enter a valid year (e.g., 2016)'),
});

// Schema for Documents Tab
export const documentsSchema = yup.object().shape({
  bscDocument: yup
    .mixed<File>()
    .nullable()
    .required('BSC Certificate is required')
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      if (!value) return false;
      return (value as File).size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Only PDF, JPG, PNG files are allowed', (value) => {
      if (!value) return false;
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      return validTypes.includes((value as File).type);
    }) as yup.Schema<File | null>,
  hscDocument: yup
    .mixed<File>()
    .nullable()
    .required('HSC Certificate is required')
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      if (!value) return false;
      return (value as File).size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Only PDF, JPG, PNG files are allowed', (value) => {
      if (!value) return false;
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      return validTypes.includes((value as File).type);
    }) as yup.Schema<File | null>,
  sscDocument: yup
    .mixed<File>()
    .nullable()
    .required('SSC Certificate is required')
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      if (!value) return false;
      return (value as File).size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Only PDF, JPG, PNG files are allowed', (value) => {
      if (!value) return false;
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      return validTypes.includes((value as File).type);
    }) as yup.Schema<File | null>,
  passportDocument: yup
    .mixed<File>()
    .nullable()
    .required('Passport is required')
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      if (!value) return false;
      return (value as File).size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Only PDF, JPG, PNG files are allowed', (value) => {
      if (!value) return false;
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      return validTypes.includes((value as File).type);
    }) as yup.Schema<File | null>,
});

