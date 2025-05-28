import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import Home from "./pages/Home";
import Viagem from "./pages/TripPlan/Viagem";
import ActiveTrip from "./pages/TripPlan/ActiveTrip";
import TripPlan from "./pages/TripPlan";
import Mapa from "./pages/Map";

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
                name="Viagem"
                component={Viagem}
                options={{headerShown: false}}
                />
                <Stack.Screen
                name="ActiveTrip"
                component={ActiveTrip}
                options={{headerShown: false}}
                />
                <Stack.Screen
                name="Mapa"
                component={Mapa}
                options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;