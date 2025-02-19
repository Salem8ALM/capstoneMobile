import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";
import {
  Card,
  Divider,
  IconButton,
  List,
  Paragraph,
  Title,
  useTheme,
} from "react-native-paper";
import LottieView from "lottie-react-native";
import { Dimensions } from "react-native";
import { useTabBar } from "../../navigations/TabBarProvider";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

const FinancialAnalysisScreen = ({ route }) => {
  const { data } = route.params;

  // Business owner data
  const firstName = data.businessOwnerUser.firstName;
  const lastName = data.businessOwnerUser.lastName;
  const username = data.businessOwnerUser.username;
  const civilId = data.businessOwnerUser.civilId;
  const mobileNumber = data.businessOwnerUser.mobileNumber;

  // Business data
  const businessState = data.businessState;
  const financialScore = data.financialScore;
  const businessNickname = data.businessNickname;

  //business license
  const licenseNumber = data.businessLicense.licenseNumber ?? "29398492049";
  const issueDate = data.businessLicense.issueDate ?? "Jan 1st, 2023";
  const centralNumber = data.businessLicense.centralNumber ?? "64532144-870";
  const commercialRegistrationNumber =
    data.businessLicense.commercialRegistrationNumber ?? "1524746281AB";
  const legalEntity = data.businessLicense.legalEntity ?? "Sole Proprietorship";
  const businessName =
    data.businessLicense.businessName ?? data.businessNickname;
  const capital = data.businessLicense.capital ?? "53000";
  const fileNumber = data.businessLicense.fileNumber ?? "4213";
  const expiryDate = data.businessLicense.expiryDate ?? "Feb 4th, 2024";
  const civilAuthorityNumber =
    data.businessLicense.civilAuthorityNumber ?? "5324-76";
  const licenseType = data.businessLicense.licenseType ?? "restuarant";
  const registrationDate =
    data.businessLicense.registrationDate ?? "Jan 4th, 2020";
  const activityName = data.businessLicense.activityName ?? "CONSUMER";
  const activityCode = data.businessLicense.activityCode ?? "AO-30";
  const addressReferenceNumber =
    data.businessLicense.addressReferenceNumber ?? "gs35";
  const governorate = data.businessLicense.governorate ?? "ASMA";
  const area = data.businessLicense.area ?? "4";
  const block = data.businessLicense.block ?? "5";
  const section = data.businessLicense.section ?? "12";
  const street = data.businessLicense.street ?? "444";
  const buildingName = data.businessLicense.buildingName ?? "1215";
  const floor = data.businessLicense.floor ?? "2";
  const unitNumber = data.businessLicense.unitNumber ?? "412";
  const lastTransactionDate =
    data.businessLicense.lastTransactionDate ?? "12341234";
  const requestNumber = data.businessLicense.requestNumber ?? "Jan 5th, 2024";

  // financial Statement Assessment
  const profitabilityGrossMargin =
    data.financialStatement.financialStatementAssessment
      .profitabilityGrossMargin ?? "0.6";
  const profitabilityNetMargin =
    data.financialStatement.financialStatementAssessment
      .profitabilityNetMargin ?? "0.4";
  const profitabilityReturnOnAssets =
    data.financialStatement.financialStatementAssessment
      .profitabilityReturnOnAssets ?? "0.16";
  const profitabilityReturnOnEquity =
    data.financialStatement.financialStatementAssessment
      .profitabilityReturnOnEquity ?? "0.4";
  const leverageDebtToEquity =
    data.financialStatement.financialStatementAssessment.leverageDebtToEquity ??
    "1.5";
  const leverageDebtToAssets =
    data.financialStatement.financialStatementAssessment.leverageDebtToAssets ??
    "0.6";
  const operatingMargin =
    data.financialStatement.financialStatementAssessment.operatingMargin ??
    "0.4";
  const valuationDividendPayoutRatio =
    data.financialStatement.financialStatementAssessment
      .valuationDividendPayoutRatio ?? "0.25";
  const valuationEarningsPerShare =
    data.financialStatement.financialStatementAssessment
      .valuationEarningsPerShare ?? "";
  const liquidityCurrentRatio =
    data.financialStatement.financialStatementAssessment
      .liquidityCurrentRatio ?? "1.67";
  const liquidityQuickRatio =
    data.financialStatement.financialStatementAssessment.liquidityQuickRatio ??
    "1.17";
  const marketPriceEarningsRatio =
    data.financialStatement.financialStatementAssessment
      .marketPriceEarningsRatio ?? "";
  const efficiencyAccountsReceivableTurnover =
    data.financialStatement.financialStatementAssessment
      .efficiencyAccountsReceivableTurnover ?? "4.0";
  const efficiencyAssetTurnover =
    data.financialStatement.financialStatementAssessment
      .efficiencyAssetTurnover ?? "";
  const solvencyInterestCoverageRatio =
    data.financialStatement.financialStatementAssessment
      .solvencyInterestCoverageRatio ?? "";
  const capitalBudgetingNetProfitFromOperatingCashFlow =
    data.financialStatement.financialStatementAssessment
      .capitalBudgetingNetProfitFromOperatingCashFlow ?? "0.625";
  const marketOverview =
    data.financialStatement.financialStatementAssessment.marketOverview;
  const businessProspects =
    data.financialStatement.financialStatementAssessment.businessProspects;
  const loanFeasibility =
    data.financialStatement.financialStatementAssessment.loanFeasibility ??
    "Yes";
  const recommendedLoanAmount =
    data.financialStatement.financialStatementAssessment
      .recommendedLoanAmount ?? "100000";
  const paymentPeriod =
    data.financialStatement.financialStatementAssessment.paymentPeriod ??
    "12 months";

  //financial statement
  const statementPeriod =
    data.financialStatement.statementPeriod ?? "01 Jan 2024 - 31 Dec 2024";
  const revenue = data.financialStatement.revenue ?? "200000";
  const costOfGoodsSold = data.financialStatement.costOfGoodsSold ?? "80000";
  const grossProfit = data.financialStatement.grossProfit ?? "120000";
  const operatingExpenses =
    data.financialStatement.operatingExpenses ?? "40000";
  const netIncome = data.financialStatement.netIncome ?? "80000";
  const zakatAmount = data.financialStatement.zakatAmount ?? "2000";
  const totalAssets = data.financialStatement.totalAssets ?? "500000";
  const cashAndCashEquivalents =
    data.financialStatement.cashAndCashEquivalents ?? "100000";
  const accountsReceivable =
    data.financialStatement.accountsReceivable ?? "50000";
  const ijaraAssets = data.financialStatement.ijaraAssets ?? "20000";
  const totalLiabilities = data.financialStatement.totalLiabilities ?? "300000";
  const accountsPayable = data.financialStatement.accountsPayable ?? "70000";
  const murabahaPayables = data.financialStatement.murabahaPayables ?? "50000";
  const shareholderEquity =
    data.financialStatement.shareholderEquity ?? "200000";
  const operatingCashFlow =
    data.financialStatement.operatingCashFlow ?? "50000";
  const investingCashFlow =
    data.financialStatement.investingCashFlow ?? "-30000";
  const financingCashFlow =
    data.financialStatement.financingCashFlow ?? "40000";
  const netCashFlow = data.financialStatement.netCashFlow ?? "60000";
  const mudaraba = data.financialStatement.mudaraba ?? "10000";
  const islamicComplianceCertification =
    data.financialStatement.islamicComplianceCertification ??
    "Certified ID: IC-12345";
  const dividendPayments = data.financialStatement.dividendPayments ?? "20000";

  const [selectedModal, setSelectedModal] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const { setShowTabBar } = useTabBar();

  useFocusEffect(
    React.useCallback(() => {
      // Hide tab bar when screen is focused
      const hideTabBarTimeout = setTimeout(() => {
        setShowTabBar(false);
      }, 100); // Adjust delay as necessary

      // Cleanup to show tab bar when the screen is blurred
      return () => {
        clearTimeout(hideTabBarTimeout);
        setShowTabBar(true);
      };
    }, []) // Empty dependency ensures it runs when screen is focused
  );

  const [expandedSections, setExpandedSections] = useState({
    loanInfo: true,
    businessDetails: false,
    businessActivities: false,
    address: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const theme = useTheme();

  const renderSection = (title, icon, content, section) => (
    <Card style={styles.card}>
      <LinearGradient
        colors={["rgba(70, 70, 70, 0.27)", "rgba(0,0,0,0)"]}
        style={styles.cardGradient}
      >
        <Card.Title
          title={title}
          left={(props) => (
            <MaterialCommunityIcons
              name={icon}
              size={24}
              color="#fff"
              {...props}
            />
          )}
          right={(props) => (
            <IconButton
              {...props}
              icon={expandedSections[section] ? "chevron-up" : "chevron-down"}
              onPress={() => toggleSection(section)}
              color="#fff"
            />
          )}
          titleStyle={styles.cardTitle}
        />
        {expandedSections[section] && <Card.Content>{content}</Card.Content>}
      </LinearGradient>
    </Card>
  );

  // Profitability Ratios
  const profitabilityData = {
    labels: ["Gross", "Net", "ROA", "ROE"],
    datasets: [
      {
        data: [
          parseFloat(profitabilityGrossMargin),
          parseFloat(profitabilityNetMargin),
          parseFloat(profitabilityReturnOnAssets),
          parseFloat(profitabilityReturnOnEquity),
        ],
      },
    ],
  };

  // Income Statement Overview
  const incomeStatementData = {
    labels: ["Revenue", "COGS", "Gross Profit", "Op. Exp", "Net Income"],
    datasets: [
      {
        data: [
          parseFloat(revenue),
          parseFloat(costOfGoodsSold),
          parseFloat(grossProfit),
          parseFloat(operatingExpenses),
          parseFloat(netIncome),
        ],
      },
    ],
  };

  // Balance Sheet Components
  const balanceSheetData = {
    labels: ["Assets", "Liabilities", "Equity"],
    datasets: [
      {
        data: [
          parseFloat(totalAssets),
          parseFloat(totalLiabilities),
          parseFloat(shareholderEquity),
        ],
      },
    ],
  };

  // Liquidity Ratios
  const liquidityData = {
    labels: ["Current Ratio", "Quick Ratio"],
    datasets: [
      {
        data: [
          parseFloat(liquidityCurrentRatio),
          parseFloat(liquidityQuickRatio),
        ],
      },
    ],
  };

  // Asset Composition
  const assetComposition = [
    {
      name: "Cash",
      value: parseFloat(cashAndCashEquivalents),
      color: "#4CAF50",
    },
    {
      name: "Receivables",
      value: parseFloat(accountsReceivable),
      color: "#2196F3",
    },
    {
      name: "Ijara Assets",
      value: parseFloat(ijaraAssets),
      color: "#9C27B0",
    },
  ];

  const cashFlowData = [
    {
      name: "Operating",
      value: Number.parseFloat(operatingCashFlow),
      color: "rgba(255, 221, 0, 0.58)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 0, // Set to 0 to hide the label
    },
    {
      name: "Investing",
      value: Math.abs(Number.parseFloat(investingCashFlow)),
      color: "rgba(255, 149, 0, 0.57)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 0, // Set to 0 to hide the label
    },
    {
      name: "Financing",
      value: Number.parseFloat(financingCashFlow),
      color: "rgba(119, 77, 0, 0.58)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 0, // Set to 0 to hide the label
    },
  ];

  const CustomLegend = () => (
    <View style={styles.legendContainer}>
      {cashFlowData.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: item.color }]} />
          <Text style={styles.legendText}>{item.name}</Text>
        </View>
      ))}
    </View>
  );
  const InfoItem = ({ icon, label, value }) => (
    <View style={styles.infoItem}>
      <MaterialCommunityIcons
        name={icon}
        size={24}
        color={theme.colors.primary}
        style={styles.icon}
      />
      <View>
        <Paragraph style={styles.label}>{label}</Paragraph>
        <Paragraph style={styles.value}>{value}</Paragraph>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.businessName}>{businessName}</Title>
          <Paragraph style={styles.financialScore}>
            Financial Score:{" "}
            <Title style={styles.scoreValue}>{financialScore}/10</Title>
          </Paragraph>
          <Paragraph style={styles.businessState}>{businessState}</Paragraph>

          <Divider style={styles.divider} />

          <Title style={styles.sectionTitle}>Loan Information</Title>
          <InfoItem
            icon="check-circle"
            label="Loan Feasibility"
            value={loanFeasibility}
          />
          <InfoItem
            icon="cash"
            label="Recommended Amount"
            value={`$${parseFloat(recommendedLoanAmount).toLocaleString()}`}
          />

          <Divider style={styles.divider} />

          <Title style={styles.sectionTitle}>Market Overview</Title>
          <Paragraph style={styles.marketOverview}>{marketOverview}</Paragraph>
        </Card.Content>
      </Card>

      {/* Profitability Analysis */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.whiteText}>Profitability Analysis</Title>
          <BarChart
            data={profitabilityData}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: "#1e1e1e",
              backgroundGradientFrom: "#1e1e1e",
              backgroundGradientTo: "#1e1e1e",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 193, 7, ${opacity})`,
            }}
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      {/* Income Statement Overview */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.whiteText}>Income Statement</Title>
          <LineChart
            data={incomeStatementData}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: "#1e1e1e",
              backgroundGradientFrom: "#1e1e1e",
              backgroundGradientTo: "#1e1e1e",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
            }}
            bezier
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      {/* Cash Flow Distribution */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.whiteText}>Cash Flow Distribution</Title>
          <PieChart
            data={cashFlowData}
            width={screenWidth - 40}
            height={180}
            chartConfig={{
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="60"
            center={[10, 0]} // Adjust the center to remove space for labels
          />
          <CustomLegend />
        </Card.Content>
      </Card>

      {/* Balance Sheet Overview */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.whiteText}>Balance Sheet Overview</Title>
          <BarChart
            data={balanceSheetData}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: "#1e1e1e",
              backgroundGradientFrom: "#1e1e1e",
              backgroundGradientTo: "#1e1e1e",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
            }}
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      {/* Key Metrics Grid */}
      <View style={styles.metricsGrid}>
        <Card style={styles.metricCard}>
          <Card.Content>
            <Title style={styles.metricTitle}>Leverage</Title>
            <Text style={styles.metricText}>
              Debt to Equity: {leverageDebtToEquity}
            </Text>
            <Text style={styles.metricText}>
              Debt to Assets: {leverageDebtToAssets}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.metricCard}>
          <Card.Content>
            <Title style={styles.metricTitle}>Efficiency</Title>
            <Text style={styles.metricText}>
              AR Turnover: {efficiencyAccountsReceivableTurnover}
            </Text>
            <Text style={styles.metricText}>
              Asset Turnover: {efficiencyAssetTurnover || "N/A"}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.metricCard}>
          <Card.Content>
            <Title style={styles.metricTitle}>Islamic Finance</Title>
            <Text style={styles.metricText}>
              Mudaraba: ${parseFloat(mudaraba).toLocaleString()}
            </Text>
            <Text style={styles.metricText}>
              Certification: {islamicComplianceCertification}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.metricCard}>
          <Card.Content>
            <Title style={styles.metricTitle}>Dividends</Title>
            <Text style={styles.metricText}>
              Payout Ratio: {valuationDividendPayoutRatio}
            </Text>
            <Text style={styles.metricText}>
              Payments: ${parseFloat(dividendPayments).toLocaleString()}
            </Text>
          </Card.Content>
        </Card>
      </View>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Business Details</Title>
          <InfoItem
            icon="file-document"
            label="License Number"
            value={`#${licenseNumber}`}
          />
          <InfoItem icon="calendar" label="Issue Date" value={issueDate} />
          <InfoItem icon="phone" label="Central Number" value={centralNumber} />
          <InfoItem
            icon="barcode"
            label="Commercial Reg. Number"
            value={`#${commercialRegistrationNumber}`}
          />
          <InfoItem icon="account" label="Legal Entity" value={legalEntity} />
          <InfoItem
            icon="currency-usd"
            label="Capital"
            value={capital.toLocaleString()}
          />
          <InfoItem icon="file-upload" label="File Number" value={fileNumber} />
          <InfoItem
            icon="calendar-end"
            label="Expiry Date"
            value={expiryDate}
          />
          <InfoItem
            icon="id-card"
            label="Civil Authority Number"
            value={civilAuthorityNumber}
          />
          <InfoItem icon="license" label="License Type" value={licenseType} />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Business Activities</Title>
          <InfoItem
            icon="briefcase"
            label="Activity Name"
            value={activityName}
          />
          <InfoItem icon="numeric" label="Activity Code" value={activityCode} />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Address</Title>
          <InfoItem
            icon="map-marker-radius"
            label="Reference Number"
            value={addressReferenceNumber}
          />
          <InfoItem
            icon="map-marker-radius"
            label="Governorate"
            value={governorate}
          />
          <InfoItem icon="map-marker-radius" label="Area" value={area} />
          <InfoItem icon="map-marker-radius" label="Block" value={block} />
          <InfoItem icon="map-marker-radius" label="Section" value={section} />
          <InfoItem icon="map-marker-radius" label="Street" value={street} />
          <InfoItem
            icon="map-marker-radius"
            label="Building Name"
            value={buildingName}
          />
          <InfoItem icon="map-marker-radius" label="Floor" value={floor} />
          <InfoItem
            icon="map-marker-radius"
            label="Unit Number"
            value={unitNumber}
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark background
  },
  cardGradient: {
    borderRadius: 10,
  },

  cardGradient: {
    borderRadius: 10,
  },
  cardTitle: {
    color: "#fff",
    fontWeight: "bold",
  },
  divider: {
    marginVertical: 8,
    backgroundColor: "#333333", // Dark grey divider
  },
  icon: {
    marginRight: 12,
    color: "rgb(255, 200, 0)",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF", // White text
  },
  marketOverview: {
    fontSize: 14,
    lineHeight: 20,
    color: "#E0E0E0", // Light grey text
  },
  label: {
    fontSize: 14,
    color: "#BDBDBD", // Light grey text
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FFFFFF", // White text
  },
  businessName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
  },
  businessState: {
    fontSize: 14,
    marginBottom: 5,
    color: "#BDBDBD", // Light grey text
  },

  highlightText: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  scoreText: {
    color: "#FFC107",
    fontSize: 18,
    fontWeight: "bold",
  },
  scoreValue: {
    color: "#4CAF50", // Keep green for emphasis
    fontWeight: "bold",
    fontSize: 15,
  },
  listTitle: {
    color: "rgb(122, 122, 122)",
  },
  listDescription: {
    color: "#e0e0e0",
  },

  businessName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#FFFFFF", // White text
  },
  highlightText: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  scoreText: {
    color: "#FFC107",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    margin: 10,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 0.2,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    marginBottom: 10,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    color: "white",
    fontSize: 12,
  },

  whiteText: {
    color: "#ffffff",
  },
  periodText: {
    color: "#ffffff",
    opacity: 0.7,
    marginTop: 5,
  },
  loanInfo: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "rgba(255, 193, 7, 0.1)",
    borderRadius: 5,
  },
  chart: {
    borderColor: "white",
    alignItems: "center",
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5,
  },
  metricCard: {
    width: (screenWidth - 30) / 2,
    margin: 5,
    backgroundColor: "#1e1e1e",
    borderColor: "white",
    borderWidth: 0.2,
  },
  metricTitle: {
    color: "#ffffff",
    fontSize: 16,
  },
  metricText: {
    color: "#ffffff",
    opacity: 0.7,
    marginTop: 5,
  },
  financialScore: {
    fontSize: 16,
    marginBottom: 4,
    color: "#E0E0E0", // Light grey text
  },
});

export default FinancialAnalysisScreen;
