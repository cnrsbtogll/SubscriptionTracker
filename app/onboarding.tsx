import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingWizard } from '../src/components/OnboardingWizard';
import { useSubscriptions } from '../src/state/useSubscriptions';
import { Currency } from '../src/db/schema';
import { nextRenewalDate } from '../src/lib/renewals';
import { Template } from '../src/lib/templates';

export default function OnboardingScreen() {
  const router = useRouter();
  const add = useSubscriptions((s) => s.add);

  const handleComplete = async (templates: Template[]) => {
    for (const tpl of templates) {
      await add({
        id: Math.random().toString(36) + Date.now().toString(),
        name: tpl.name,
        price: tpl.price,
        currency: tpl.currency as Currency,
        cycle: 'monthly',
        nextRenewal: nextRenewalDate(new Date(), 'monthly').toISOString(),
        color: '#6366F1',
        icon: tpl.icon,
        notes: '',
      });
    }
    await AsyncStorage.setItem('hasOnboarded', '1');
    router.replace('/');
  };

  return (
    <View style={{ flex: 1 }}>
      <OnboardingWizard onComplete={handleComplete} />
    </View>
  );
}