// // import { Tabs } from "expo-router";
// // import { useEffect } from "react";
// // import { View, Text } from "react-native";
// // import { initDatabase } from "../database/schema";
// // import {
// //   Home,
// //   PlusCircle,
// //   Heart,
// //   FileText,
// //   Code2,
// //   UploadCloud,
// //   Settings2,
// // } from "lucide-react-native";

// // function TabIcon({
// //   Icon,
// //   label,
// //   color,
// // }: {
// //   Icon: any;
// //   label: string;
// //   color: string;
// // }) {
// //   return (
// //     <View
// //       style={{
// //         alignItems: "center",
// //       }}
// //     >
// //       <Icon color={color} size={22} />
// //       <Text
// //         style={{
// //           color,
// //           fontSize: 11,
// //           marginTop: 4,
// //         }}
// //       >
// //         {label}
// //       </Text>
// //     </View>
// //   );
// // }

// // export default function RootLayout() {
// //   useEffect(() => {
// //     initDatabase();
// //   }, []);

// //   return (
// //     <Tabs
// //       screenOptions={{
// //         headerShown: false,
// //         tabBarStyle: {
// //           backgroundColor: "#020617",
// //           borderTopColor: "#334155",
// //           borderTopWidth: 1,
// //           height: 68,
// //           paddingTop: 8,
// //         },
// //         tabBarActiveTintColor: "#38bdf8",
// //         tabBarInactiveTintColor: "#94a3b8",
// //         tabBarShowLabel: false,
// //       }}
// //     >
// //       <Tabs.Screen
// //         name="index"
// //         options={{
// //           title: "Home",
// //           tabBarIcon: ({ color }) => (
// //             <TabIcon Icon={Home} label="Home" color={color} />
// //           ),
// //         }}
// //       />
// //       <Tabs.Screen
// //         name="create"
// //         options={{
// //           title: "Create",
// //           tabBarIcon: ({ color }) => (
// //             <TabIcon Icon={PlusCircle} label="Create" color={color} />
// //           ),
// //         }}
// //       />
// //       <Tabs.Screen
// //         name="favorites"
// //         options={{
// //           title: "Favorites",
// //           tabBarIcon: ({ color }) => (
// //             <TabIcon Icon={Heart} label="Favs" color={color} />
// //           ),
// //         }}
// //       />
// //       <Tabs.Screen
// //         name="files"
// //         options={{
// //           title: "Files",
// //           tabBarIcon: ({ color }) => (
// //             <TabIcon Icon={FileText} label="Files" color={color} />
// //           ),
// //         }}
// //       />
// //       <Tabs.Screen
// //         name="generate"
// //         options={{
// //           title: "AI",
// //           tabBarIcon: ({ color }) => (
// //             <TabIcon Icon={Code2} label="AI" color={color} />
// //           ),
// //         }}
// //       />
// //       <Tabs.Screen
// //         name="import"
// //         options={{
// //           title: "Import",
// //           tabBarIcon: ({ color }) => (
// //             <TabIcon Icon={UploadCloud} label="Import" color={color} />
// //           ),
// //         }}
// //       />
// //       <Tabs.Screen
// //         name="settings"
// //         options={{
// //           title: "Settings",
// //           tabBarIcon: ({ color }) => (
// //             <TabIcon Icon={Settings2} label="Settings" color={color} />
// //           ),
// //         }}
// //       />
// //     </Tabs>
// //   );
// // }




// import { Tabs } from "expo-router";
// import { useEffect } from "react";
// import { View, Text } from "react-native";
// import { initDatabase } from "../database/schema";
// import {
//   Home,
//   Heart,
//   Code2,
//   Settings2,
// } from "lucide-react-native";

// function TabIcon({
//   Icon,
//   label,
//   color,
// }: {
//   Icon: any;
//   label: string;
//   color: string;
// }) {
//   return (
//     <View
//       style={{
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Icon color={color} size={22} />
//       <Text
//         style={{
//           color,
//           fontSize: 11,
//           marginTop: 4,
//         }}
//       >
//         {label}
//       </Text>
//     </View>
//   );
// }

// export default function RootLayout() {
//   useEffect(() => {
//     initDatabase();
//   }, []);

//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: "#020617",
//           borderTopColor: "#334155",
//           borderTopWidth: 1,
//           height: 70,
//           paddingTop: 8,
//         },
//         tabBarActiveTintColor: "#38bdf8",
//         tabBarInactiveTintColor: "#94a3b8",
//         tabBarShowLabel: false,
//       }}
//     >
//       {/* Home */}
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color }) => (
//             <TabIcon Icon={Home} label="Home" color={color} />
//           ),
//         }}
//       />

//       {/* AI */}
//       <Tabs.Screen
//         name="generate"
//         options={{
//           title: "AI",
//           tabBarIcon: ({ color }) => (
//             <TabIcon Icon={Code2} label="AI" color={color} />
//           ),
//         }}
//       />

//       {/* Favorites */}
//       <Tabs.Screen
//         name="favorites"
//         options={{
//           title: "Favorites",
//           tabBarIcon: ({ color }) => (
//             <TabIcon Icon={Heart} label="Favs" color={color} />
//           ),
//         }}
//       />

//       {/* Settings */}
//       <Tabs.Screen
//         name="settings"
//         options={{
//           title: "Settings",
//           tabBarIcon: ({ color }) => (
//             <TabIcon Icon={Settings2} label="Settings" color={color} />
//           ),
//         }}
//       />

//       {/* Hide these routes from the tab bar */}
//       <Tabs.Screen
//         name="create"
//         options={{
//           href: null,
//         }}
//       />
//       <Tabs.Screen
//         name="files"
//         options={{
//           href: null,
//         }}
//       />
//       <Tabs.Screen
//         name="import"
//         options={{
//           href: null,
//         }}
//       />
//     </Tabs>
//   );
// }

import { Tabs } from "expo-router";
import { Home, Heart, Code2, Settings2 } from "lucide-react-native";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#38bdf8",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: {
          backgroundColor: "#020617",
          borderTopColor: "#334155",
          height: 65,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="generate"
        options={{
          title: "AI",
          tabBarIcon: ({ color, size }) => (
            <Code2 color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favs",
          tabBarIcon: ({ color, size }) => (
            <Heart color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Settings2 color={color} size={size} />
          ),
        }}
      />

      {/* Hidden Routes */}
      <Tabs.Screen name="create" options={{ href: null }} />
      <Tabs.Screen name="files" options={{ href: null }} />
      <Tabs.Screen name="import" options={{ href: null }} />
      <Tabs.Screen name="details/[id]" options={{ href: null }} />
      <Tabs.Screen name="edit/[id]" options={{ href: null }} />
    </Tabs>
  );
}