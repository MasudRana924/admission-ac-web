const DEVICE_ID_KEY = 'deviceId';

export const getOrCreateDeviceId = (): string | null => {
  if (typeof window === 'undefined' || typeof crypto === 'undefined') {
    return null;
  }

  const existingId = localStorage.getItem(DEVICE_ID_KEY);
  if (existingId) {
    return existingId;
  }

  const newId = crypto.randomUUID();
  localStorage.setItem(DEVICE_ID_KEY, newId);
  return newId;
};

export const detectClientPlatform = (): string => {
  if (typeof window === 'undefined') {
    return 'unknown';
  }

  const userAgent = navigator.userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'ios';
  }

  if (/android/.test(userAgent)) {
    return 'android';
  }

  if (/win/.test(userAgent)) {
    return 'windows';
  }

  if (/mac/.test(userAgent)) {
    return 'macos';
  }

  return 'web';
};


