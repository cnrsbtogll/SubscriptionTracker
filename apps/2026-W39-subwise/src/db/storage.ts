import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY, STORAGE_VERSION } from '../lib/constants';
import { Subscription, StoragePayload } from './schema';

export async function loadSubscriptions(): Promise<Subscription[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data: StoragePayload = JSON.parse(raw);
    if (data.version !== STORAGE_VERSION) return [];
    return data.subscriptions;
  } catch {
    return [];
  }
}

export async function saveSubscriptions(subs: Subscription[]): Promise<void> {
  const payload: StoragePayload = { version: STORAGE_VERSION, subscriptions: subs };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}
