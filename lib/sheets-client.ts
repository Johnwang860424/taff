import { google, type sheets_v4 } from "googleapis";

let cachedClient: sheets_v4.Sheets | null = null;

const createAuth = (scopes: string[]) =>
  new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    },
    scopes,
  });

export const getReadonlySheets = (): sheets_v4.Sheets => {
  if (cachedClient) return cachedClient;
  const auth = createAuth([
    "https://www.googleapis.com/auth/spreadsheets.readonly",
  ]);
  cachedClient = google.sheets({ version: "v4", auth });
  return cachedClient;
};

export const getReadWriteSheets = (): sheets_v4.Sheets => {
  const auth = createAuth([
    "https://www.googleapis.com/auth/spreadsheets",
  ]);
  return google.sheets({ version: "v4", auth });
};
