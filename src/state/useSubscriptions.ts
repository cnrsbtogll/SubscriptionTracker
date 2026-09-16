import { create } from 'zustand';
import { Subscription } from '../db/schema';
import { loadSubscriptions, saveSubscriptions } from '../db/storage';
import { LIMIT_FREE } from '../lib/constants';
import { autoAdvanceOverdue } from '../lib/renewals';

interface SubState {
  subs: Subscription[];
  loaded: boolean;
  load: () => Promise<void>;
  add: (sub: Subscription) => Promise<boolean>; // false = limit
  update: (sub: Subscription) => Promise<void>;
  remove: (id: string) => Promise<void>;
  atLimit: () => boolean;
}

export const useSubscriptions = create<SubState>((set, get) => ({
  subs: [],
  loaded: false,
  load: async () => {
    const rawSubs = await loadSubscriptions();
    let hasChanges = false;
    const subs = rawSubs.map((s) => {
      const updatedDate = autoAdvanceOverdue(s.nextRenewal, s.cycle, s.customDays);
      if (updatedDate !== s.nextRenewal) {
        hasChanges = true;
        return { ...s, nextRenewal: updatedDate };
      }
      return s;
    });
    if (hasChanges) {
      await saveSubscriptions(subs);
    }
    set({ subs, loaded: true });
  },
  add: async (sub) => {
    const current = get().subs;
    if (current.length >= LIMIT_FREE) return false;
    const updated = [...current, sub];
    await saveSubscriptions(updated);
    set({ subs: updated });
    return true;
  },
  update: async (sub) => {
    const updated = get().subs.map((s) => (s.id === sub.id ? sub : s));
    await saveSubscriptions(updated);
    set({ subs: updated });
  },
  remove: async (id) => {
    const updated = get().subs.filter((s) => s.id !== id);
    await saveSubscriptions(updated);
    set({ subs: updated });
  },
  atLimit: () => get().subs.length >= LIMIT_FREE,
}));
