import { google } from 'googleapis';
import { unstable_cache } from 'next/cache';

export interface MenuItem {
  name: string;
  price: number;
  img: string;
}

export interface MenuData {
  deliverableItems: MenuItem[];
  pickupOnlyItems: MenuItem[];
}

export const getMenuData = unstable_cache(
  async (): Promise<MenuData> => {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const range = ['可宅配!A:C', '限自取!A:C'];
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges: range,
    });

    const deliverableRows = response.data.valueRanges?.[0].values?.slice(1) || [];
    const pickupOnlyRows = response.data.valueRanges?.[1].values?.slice(1) || [];

    const deliverableItems = deliverableRows.map((row: string[]) => ({
      name: row[0] || '',
      price: Number(row[1]) || 0,
      img: row[2] || '',
    }));

    const pickupOnlyItems = pickupOnlyRows.map((row: string[]) => ({
      name: row[0] || '',
      price: Number(row[1]) || 0,
      img: row[2] || '',
    }));

    return { deliverableItems, pickupOnlyItems };
  },
  ['menu-data-cache'],
  { revalidate: 3600, tags: ['menu'] }
);
