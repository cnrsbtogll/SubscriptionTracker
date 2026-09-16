import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSubscriptions } from '../src/state/useSubscriptions';
import { t, getLanguage } from '../src/i18n/strings';
import { colors } from '../constants/theme';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const ICONS: Record<string, { focused: IconName; unfocused: IconName }> = {
  index: { focused: 'home', unfocused: 'home-outline' },
  settings: { focused: 'settings', unfocused: 'settings-outline' },
};

export default function Layout() {
  const load = useSubscriptions((s) => s.load);

  useEffect(() => {
    load();
  }, []);

  // Dil değişiminde tab label'ları yeniden render edilsin
  const lang = getLanguage();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.primary,
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        tabBarIcon: ({ focused, color, size }) => {
          const icon = ICONS[route.name] ?? { focused: 'help-circle' as IconName, unfocused: 'help-circle-outline' as IconName };
          return <Ionicons name={focused ? icon.focused : icon.unfocused} size={size} color={color} />;
        },
        tabBarHideOnKeyboard: true,
      })}
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