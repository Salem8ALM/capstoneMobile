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
import { Card, Paragraph, Title } from "react-native-paper";
import LottieView from "lottie-react-native";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const FinancialAnalysisScreen = ({ route }) => {
  const { data, ownerAvatar, businessAvatar } = route.params;

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

  // Cash Flow Components
  const cashFlowData = [
    {
      name: "Operating",
      value: parseFloat(operatingCashFlow),
      color: "#FF8C00",
    },
    {
      name: "Investing",
      value: Math.abs(parseFloat(investingCashFlow)),
      color: "#00CED1",
    },
    {
      name: "Financing",
      value: parseFloat(financingCashFlow),
      color: "#FF69B4",
    },
  ];

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

  return (
    <ScrollView style={styles.container}>
      {/* Header with Financial Score */}
      <Card style={styles.scoreCard}>
        <Card.Content>
          <Title style={styles.whiteText}>
            Financial Score: {financialScore}
          </Title>
          <Paragraph style={styles.periodText}>
            Period: {statementPeriod}
          </Paragraph>
          <View style={styles.loanInfo}>
            <Text style={styles.whiteText}>
              Loan Feasibility: {loanFeasibility}
            </Text>
            <Text style={styles.whiteText}>
              Recommended Amount: $
              {parseFloat(recommendedLoanAmount).toLocaleString()}
            </Text>
          </View>
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
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="15"
          />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scoreCard: {
    margin: 10,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
  },
  card: {
    margin: 10,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
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
    marginVertical: 8,
    borderRadius: 16,
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
});

export default FinancialAnalysisScreen;
