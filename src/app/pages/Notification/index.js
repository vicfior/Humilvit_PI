import React, {useState} from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "../Notification/styles";

export default function Notification ({onClose}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
  return (
    <View style={styles.drawer}>
      <View style={styles.drawerHeader}>
        <Icon name="notifications-circle-outline" size={35} style={styles.iconNotificationDrawer}/>
        <Text style={styles.drawerHeaderTitle}>Notificações</Text>
      </View>
      <View style={styles.lineIndicatorDrawer}></View> 
      <View style={styles.drawerBody}>
        <Text style={styles.drawerBodyText}>Permitir Notificações Push</Text>
        <View style={styles.drawerButtons}>
          <TouchableOpacity style={styles.buttonOn}>
            <Text style={styles.buttonText}>ON</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOff}>
            <Text style={styles.buttonText}>OFF</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lineIndicatorDrawer2}></View>
        <Text style={styles.drawerBodyText}>Desativar alertas da próxima parada</Text>
        <Switch
          trackColor={{false: '#555555', true: '#555555'}}
          thumbColor={isEnabled ? '#0888D8' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.switchLarge}
        />
      </View>
    </View>
  );
}