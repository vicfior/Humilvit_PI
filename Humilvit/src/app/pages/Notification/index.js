import React from "react";
import { View, Text, Animated, TouchableOpacity, Switch, Button } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "../../../components/styles";

export default function Notification ({onClose}) {
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
        
      </View>
    </View>
  );
}