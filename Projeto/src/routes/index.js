import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from '../pages/Welcome';
import Signin from  '../pages/Signin';
import Menu from  '../pages/Menu';
import Cclient from '../pages/Cclient'
import Gclient from '../pages/Gclient'
import Aclient from '../pages/Aclient'
import Cfunctionary from '../pages/Cfunctionary'
import Gfunctionary from '../pages/Gfunctionary'
import Afunctionary from '../pages/Afunctionary'
import Cconsultation from '../pages/Cconsultation'
import Gconsultation from '../pages/Gconsultation'
import Aconsultation from '../pages/Aconsultation'

const Stack = createNativeStackNavigator();

export default function Routes(){
    
    
    


    return(
        <Stack.Navigator>
        
        
        {/* Menu em teste */}
        <Stack.Screen 
            name="Menu"
            component={Menu}
            options={{ headerShown: false}}
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
            name="Cclient"
            component={Cclient}
            options={{ headerShown: false }}
        />

        <Stack.Screen
            name="Gclient"
            component={Gclient}
            options={{ headerShown: false }}
        />

        <Stack.Screen
            name="Aclient"
            component={Aclient}
            options={{ headerShown: false }}
        />
        
        <Stack.Screen
            name="Cfunctionary"
            component={Cfunctionary}
            options={{ headerShown: false }}
        />

        <Stack.Screen
            name="Gfunctionary"
            component={Gfunctionary}
            options={{ headerShown: false }}
        />

        <Stack.Screen
            name="Afunctionary"
            component={Afunctionary}
            options={{ headerShown: false }}
        />

        <Stack.Screen
            name="Cconsultation"
            component={Cconsultation}
            options={{ headerShown: false }}
        />

        <Stack.Screen
            name="Gconsultation"
            component={Gconsultation}
            options={{ headerShown: false }}
        />

        <Stack.Screen
            name="Aconsultation"
            component={Aconsultation}
            options={{ headerShown: false }}
        />
       
        </Stack.Navigator>
    )
}