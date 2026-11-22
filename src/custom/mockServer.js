import seedApplications from '../data/applications.json';

const STORAGE_KEY = 'applications';
const NETWORK_DELAY = 400;

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Данные демо-CRM хранятся в localStorage посетителя; при первом
// запуске (или повреждённых данных) используется сид из applications.json
const readStore = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const applications = JSON.parse(saved);
      if (Array.isArray(applications)) return applications;
    }
  } catch (error) {
    // Битый JSON в localStorage — откатываемся на сид
  }
  return null;
};

const writeStore = (applications) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
};

const readCurrent = () => readStore() ?? seedApplications;

export const fetchApplications = async () => {
  await delay(NETWORK_DELAY);
  const applications = readCurrent();
  writeStore(applications);
  return applications;
};

export const createApplication = async (application) => {
  await delay(NETWORK_DELAY);
  writeStore([...readCurrent(), application]);
  return application;
};

export const updateApplication = async (application) => {
  await delay(NETWORK_DELAY);
  writeStore(
    readCurrent().map((app) =>
      app.id === application.id ? application : app,
    ),
  );
  return application;
};

export const deleteApplication = async (id) => {
  await delay(NETWORK_DELAY);
  writeStore(readCurrent().filter((app) => app.id !== id));
};
