import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationsModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Notifications</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.notificationsList}>
            {/* Add your notification items here */}
            <View style={styles.notificationItem}>
              <Text style={styles.notificationTitle}>Loan Request Approved</Text>
              <Text style={styles.notificationText}>Your loan request has been approved by Boubyan Bank</Text>
            </View>
            {/* Add more notification items as needed */}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#292933',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '70%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    backgroundColor: '#3D3D47',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  notificationTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  notificationText: {
    color: '#8E8E93',
    fontSize: 14,
  },
});

export default NotificationsModal; 