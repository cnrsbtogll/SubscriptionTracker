import * as Notifications from 'expo-notifications';
import { Subscription, Cycle } from '../db/schema';
import { reminderDaysBefore, daysUntil } from './renewals';

export async function requestNotificationPermission(): Promise<boolean> {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleRenewalReminders(sub: Subscription): Promise<string[]> {
  const ids: string[] = [];
  const days = reminderDaysBefore(sub.cycle);
  for (const d of days) {
    const remaining = daysUntil(sub.nextRenewal);
    if (remaining <= d) continue; // too close or past
    const trigger = new Date(sub.nextRenewal);
    trigger.setDate(trigger.getDate() - d);
    trigger.setHours(9, 0, 0, 0); // sabah 9
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: `${sub.icon} ${sub.name}`,
        body: d === 1 ? 'Yarın yenileniyor!' : `${d} gün sonra yenileniyor!`,
      },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: trigger },
    });
    ids.push(id);
  }
  return ids;
}

export async function cancelReminders(ids: string[]): Promise<void> {
  for (const id of ids) {
    await Notifications.cancelScheduledNotificationAsync(id);
  }
}
