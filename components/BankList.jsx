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
import ABKRequest from "../components/ABKRequest";
import KFHRequest from "./KFHRequest";
import WarbaRequest from "./WarbaRequest";
import BurganRequest from "./BurganRequest";
import KIBRequest from "./KIBRequest";

const bankData = [
  { name: "Boubyan", component: BoubyanRequest, isIslamic: true },
  { name: "NBK", component: NBKRequest, isIslamic: false },
  { name: "KFH", component: KFHRequest, isIslamic: true },
  { name: "ABK", component: ABKRequest, isIslamic: false },
  { name: "Warba", component: WarbaRequest, isIslamic: true },
  { name: "Burgan", component: BurganRequest, isIslamic: false },
  { name: "KIB", component: KIBRequest, isIslamic: true },
];

const bankMappings = {
  ABK: "ABK_BANK",
  Boubyan: "BOUBYAN_BANK",
  Burgan: "BURGAN_BANK",
  KFH: "KUWAIT_FINANCE_HOUSE",
  NBK: "NBK_BANK",
  Warba: "WARBA_BANK",
  KIB: "KUWAIT_INTERNATIONAL_BANK",
};

export function BankList({ setBanksSelected }) {
  const [selectedCards, setSelectedCards] = useState(
    Object.fromEntries(bankData.map((bank) => [bank.name, false]))
  );
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isIslamicFilterOn, setIsIslamicFilterOn] = useState(false);

  const [selectAllAnim] = useState(new Animated.Value(0));

  const selectAllTextColor = selectAllAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["white", "black"], // White when unselected, black when selected
  });

  const handleSelectAll = () => {
    // Determine if all currently selectable banks are selected
    const allRelevantSelected = bankData
      .filter((bank) => (isIslamicFilterOn ? bank.isIslamic : true)) // Consider only Islamic banks if filter is on
      .every((bank) => selectedCards[bank.name]); // Check if all relevant banks are already selected

    const newValue = !allRelevantSelected; // Toggle selection state

    setSelectedCards((prev) => {
      const updatedState = Object.fromEntries(
        bankData.map((bank) => {
          // Only toggle Islamic banks if the filter is on, otherwise toggle all banks
          const shouldSelect = isIslamicFilterOn ? bank.isIslamic : true;
          return [bank.name, shouldSelect ? newValue : prev[bank.name]];
        })
      );

      const selectedBanksList = Object.entries(updatedState)
        .filter(([_, isSelected]) => isSelected) // Only selected banks
        .map(([name]) => bankMappings[name]); // Map to identifiers

      setBanksSelected(selectedBanksList);
      console.log(selectedBanksList);

      return updatedState;
    });
    Animated.timing(selectAllAnim, {
      toValue: newValue ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const selectAllBg = selectAllAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(255, 255, 255, 0.1)", "#FFD700"], // From normal to yellow
  });

  const handleCardSelect = (bankName) => {
    setSelectedCards((prev) => {
      const updatedState = { ...prev, [bankName]: !prev[bankName] };

      const selectedBanksList = Object.entries(updatedState)
        .filter(([bankName, isSelected]) => isSelected) // Only keep selected banks
        .map(([bankName]) => bankMappings[bankName]); // Map to corresponding identifier

      console.log(selectedBanksList);

      setBanksSelected(selectedBanksList);

      return updatedState;
    });
  };

  const toggleFilterModal = () => {
    setIsFilterModalVisible(!isFilterModalVisible);
  };

  const toggleIslamicFilter = () => {
    setIsIslamicFilterOn(!isIslamicFilterOn);
    setSelectedCards(
      Object.fromEntries(bankData.map((bank) => [bank.name, false]))
    );
    setBanksSelected(null);
  };

  const filteredBanks = isIslamicFilterOn
    ? bankData.filter((bank) => bank.isIslamic)
    : bankData;

  const isAnyCardSelected = Object.values(selectedCards).some((value) => value);

  return (
    <View style={styles.container}>
      <View style={styles.banksSection}>
        <View style={styles.header}>
          <Text style={styles.title}>Available Banks:</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={handleSelectAll}>
              <Animated.View
                style={[
                  styles.selectAllButton,
                  { backgroundColor: selectAllBg },
                ]}
              >
                {selectAllAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }) > 0.5 && (
                  <Ionicons name="checkmark-outline" size={20} color="white" />
                )}
                <Animated.Text
                  style={[styles.selectAllText, { color: selectAllTextColor }]}
                >
                  Select all
                </Animated.Text>
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={toggleFilterModal}
            >
              <Ionicons name="options-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

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
    height: 460, // Fixed height
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
    height: 460, // Ensure this section also has a fixed height
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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    transition: "background-color 0.3s ease-in-out",
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
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "rgba(119, 119, 119, 0.52)",
  },
  scrollContent: {
    padding: 10,
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
    marginBottom: 40,
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
