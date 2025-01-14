import {Tabs} from 'expo-router'


export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="home" options={{title: 'Home', icon: "🏠"}} />
            <Tabs.Screen name="notifications" options={{ title: "Notifications", icon: "🔔" }}/>
            <Tabs.Screen name="statistics" options={{ title: "Statistics", icon: "📊" }} />
            <Tabs.Screen name="profile" options={{ title: "Profile", icon: "👤" }} />
        </Tabs>
    )
}