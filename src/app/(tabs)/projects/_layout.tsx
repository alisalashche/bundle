import { Stack } from "expo-router";

export default function TabStack() {
    return <Stack screenOptions={{ headerShown: false }} />;
}

//Needed to keep nav bar in the nested detail screens as well