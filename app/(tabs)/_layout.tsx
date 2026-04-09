import { useColors } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const { $color } = useColors();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: $color.primary,
        sceneStyle: { backgroundColor: $color.bg },
        headerShown: false,

      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tune',
          tabBarIcon: ({ color }) => <Icon size={28} name="guitar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: 'Tools',
          tabBarIcon: ({ color }) => <Icon size={28} name="toolbox" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(chooseTuning)"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
