import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { useSubscriptions } from '../src/state/useSubscriptions';
import { t } from '../src/i18n/strings';
import { colors } from '../constants/theme';

export default function Layout() {
  const load = useSubscriptions((s) => s.load);

  useEffect(() => {
    load();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: t('dashboard.title'), tabBarLabel: t('dashboard.title') }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: t('settings.title'), tabBarLabel: t('settings.title') }}
      />
      <Tabs.Screen
        name="onboarding"
        options={{ href: null, headerShown: false }}
      />
      <Tabs.Screen
        name="subscription/[id]"
        options={{ href: null, headerShown: false }}
      />
    </Tabs>
  );
}
