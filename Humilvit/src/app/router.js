import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import Home from "./pages/Home";
import Notification from "./pages/Notification";
import Signal from "./pages/Signal";

const Stack = createStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown: false}}
                />
                <Stack.Screen
                name="Notification"
                component={Notification}
                />
                <Stack.Screen
                name="Signal"
                component={Signal}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;