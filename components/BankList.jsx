import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  Switch,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BoubyanRequest from "../components/BoubyanRequest";
import NBKRequest from "../components/NBKRequest";
import CBKRequest from "../components/CBKRequest";
import GBKRequest from "../components/GBKRequest";
import ABKRequest from "../components/ABKRequest";
import KIBRequest from "../components/KIBRequest";
import { Button } from "react-native-paper";

const bankData = [
  { name: "Boubyan", component: BoubyanRequest, isIslamic: true },
  { name: "NBK", component: NBKRequest, isIslamic: false },
  { name: "CBK", component: CBKRequest, isIslamic: false },
  { name: "GBK", component: GBKRequest, isIslamic: false },
  { name: "ABK", component: ABKRequest, isIslamic: false },
  { name: "KIB", component: KIBRequest, isIslamic: true },
];

export function BankList({ loanDetails }) {
  const [selectedCards, setSelectedCards] = useState(
    Object.fromEntries(bankData.map((bank) => [bank.name, false]))
  );
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isIslamicFilterOn, setIsIslamicFilterOn] = useState(false);

  const handleSelectAll = () => {
    const newValue = !Object.values(selectedCards).every((v) => v);
    setSelectedCards(
      Object.fromEntries(bankData.map((bank) => [bank.name, newValue]))
    );
  };

  const handleCardSelect = (bankName) => {
    setSelectedCards((prev) => ({
      ...prev,
      [bankName]: !prev[bankName],
    }));
  };

  const toggleFilterModal = () => {
    setIsFilterModalVisible(!isFilterModalVisible);
  };

  const toggleIslamicFilter = () => {
    setIsIslamicFilterOn(!isIslamicFilterOn);
  };

  const filteredBanks = isIslamicFilterOn
    ? bankData.filter((bank) => bank.isIslamic)
    : bankData;

  const isAnyCardSelected = Object.values(selectedCards).some((value) => value);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>Select your Bank</Text>
      </View>
      <View style={styles.description}>
        <Text>Please select the bank you would like to apply with.</Text>
      </View>
      <View style={styles.banksSection}>
        <View style={styles.header}>
          <Text style={styles.title}>Available Banks:</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.selectAllButton}
              onPress={handleSelectAll}
            >
              <Ionicons name="checkmark-outline" size={20} color="white" />
              <Text style={styles.selectAllText}>Select all</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={toggleFilterModal}
            >
              <Ionicons name="options-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <Animated.View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPressIn={() => handlePressIn(scaleAnim)}
            onPressOut={() => handlePressOut(scaleAnim)}
            style={styles.primaryButton}
            labelStyle={styles.primaryButtonText}
            onPress={() =>
              navigation.push(Routes.LoanRequest.LoanRequestDetails)
            }
          >
            Get Started
          </Button>
        </Animated.View>

        <View style={styles.scrollContainer}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            {filteredBanks.map((bank) => {
              const BankComponent = bank.component;
              return (
                <View key={bank.name} style={styles.cardWrapper}>
                  <BankComponent
                    isSelected={selectedCards[bank.name]}
                    onPress={() => handleCardSelect(bank.name)}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={toggleFilterModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Options</Text>
            <View style={styles.filterOption}>
              <Text style={styles.filterOptionText}>Islamic Banks</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#FFD700" }}
                thumbColor={isIslamicFilterOn ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleIslamicFilter}
                value={isIslamicFilterOn}
              />
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleFilterModal}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginLeft: 10,
  },
  description: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  banksSection: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectAllButton: {
    marginRight: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  selectAllText: {
    color: "#FFD700",
    fontSize: 14,
    marginLeft: 5,
  },
  filterButton: {
    padding: 5,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Increase bottom padding to ensure full visibility
  },
  applyButton: {
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  applyButtonActive: {
    backgroundColor: "#FFD700",
  },
  applyButtonInactive: {
    backgroundColor: "#292933",
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  applyButtonText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  applyButtonTextActive: {
    color: "#292933",
  },
  applyButtonTextInactive: {
    color: "#FFD700",
  },
  cardWrapper: {
    marginBottom: 15,
    width: "100%",
    height: "200",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#292933",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 15,
  },
  filterOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  filterOptionText: {
    fontSize: 16,
    color: "#ffffff",
  },
  closeButton: {
    backgroundColor: "#FFD700",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  closeButtonText: {
    color: "#292933",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default BankList;
