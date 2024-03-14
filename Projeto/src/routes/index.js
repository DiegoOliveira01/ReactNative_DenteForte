import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from '../pages/Welcome';
import Signin from  '../pages/Signin';
import Menu from  '../pages/Menu';

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
        <Stack.Screen 
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false}}
        />
        <Stack.Screen  
            name="SignIn"
            component={Signin}
            options={{ headerShown: false}}
        />
        <Stack.Screen 
            name="Menu"
            component={Menu}
            options={{ headerShown: false}}
        />
        </Stack.Navigator>
    )
}