import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from '../pages/Welcome';
import Signin from  '../pages/Signin';
import Menu from  '../pages/Menu';
import Cclient from '../pages/Cclient'
import Gclient from '../pages/Gclient'
import Aclient from '../pages/Aclient'

const Stack = createNativeStackNavigator();

export default function Routes(){
    
    
    


    return(
        <Stack.Navigator>
        
        
        {/* Gclient Tela em teste */}
        <Stack.Screen
            name="Gclient"
            component={Gclient}
            options={{ headerShown: false }}
        />
        

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
        <Stack.Screen
            name="Cclient"
            component={Cclient}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Aclient"
            component={Aclient}
            options={{ headerShown: false }}
        />
        
       
        </Stack.Navigator>
    )
}