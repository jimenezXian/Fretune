import { Icon } from '@/components/ui/Icon';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="tune"
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="tune"
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
    </Tabs>
  );
}
