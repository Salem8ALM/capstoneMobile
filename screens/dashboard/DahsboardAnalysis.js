import React, { useState, useRef } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import {
  Modal,
  Portal,
  Provider as PaperProvider,
  Text,
  Card,
  Button,
  Title,
  Paragraph,
  IconButton,
  Surface,
} from "react-native-paper";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";

const FinancialAnalysisScreen = ({ route }) => {
  const { financialData } = route.params;
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const renderHeader = () => (
    <Animated.View
      style={[
        styles.headerContainer,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Surface style={styles.scoreCard}>
        <LinearGradient
          colors={["#2e2e2e", "#1e1e1e"]}
          style={styles.gradientBackground}
        >
          <Title style={styles.scoreTitle}>Financial Score</Title>
          <Text style={styles.scoreValue}>
            {financialData?.financialScore ? financialData.financialScore : 8}
            /10
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${
                    ((financialData?.financialScore
                      ? financialData.financialScore
                      : 8) /
                      10) *
                    100
                  }%`,
                },
              ]}
            />
          </View>
          <Text style={styles.businessState}>
            {financialData?.businessState
              ? financialData.businessState
              : "GOOD"}
          </Text>
        </LinearGradient>
      </Surface>
    </Animated.View>
  );

  const renderMetricsCard = () => (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Card style={styles.metricsCard}>
        <LinearGradient
          colors={["#2e2e2e", "#1e1e1e"]}
          style={styles.gradientBackground}
        >
          <Card.Content>
            <Title style={styles.cardTitle}>Key Metrics</Title>
            <View style={styles.metricsGrid}>
              {renderMetricItem(
                "Gross Margin",
                financialData.financialStatement.financialStatementAssessment
                  .profitabilityGrossMargin,
                "%"
              )}
              {renderMetricItem(
                "ROE",
                financialData.financialStatement.financialStatementAssessment
                  .profitabilityReturnOnEquity,
                "%"
              )}
              {renderMetricItem(
                "Current Ratio",
                financialData.financialStatement.financialStatementAssessment
                  .liquidityCurrentRatio
              )}
              {renderMetricItem(
                "Asset Turnover",
                financialData.financialStatement.financialStatementAssessment
                  .efficiencyAssetTurnover
              )}
            </View>
          </Card.Content>
        </LinearGradient>
      </Card>
    </Animated.View>
  );

  const renderMetricItem = (label, value, suffix = "") => (
    <View style={styles.metricItem}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>
        {(value * 100).toFixed(1)}
        {suffix}
      </Text>
    </View>
  );

  const renderCharts = () => {
    const profitabilityData = {
      labels: ["Gross", "Net", "Operating"],
      datasets: [
        {
          data: [
            financialData.financialStatement.financialStatementAssessment
              .profitabilityGrossMargin,
            financialData.financialStatement.financialStatementAssessment
              .profitabilityNetMargin,
            financialData.financialStatement.financialStatementAssessment
              .operatingMargin,
          ].map((val) => val * 100),
        },
      ],
    };

    return (
      <Animated.View style={[styles.chartsContainer, { opacity: fadeAnim }]}>
        <Card style={styles.chartCard}>
          <Card.Content>
            <Title style={styles.chartTitle}>Profitability Analysis</Title>
            <BarChart
              data={profitabilityData}
              width={Dimensions.get("window").width - 48}
              height={220}
              chartConfig={{
                backgroundColor: "transparent",
                backgroundGradientFrom: "#2e2e2e",
                backgroundGradientTo: "#1e1e1e",
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForBackgroundLines: {
                  strokeDasharray: "6",
                  stroke: "#ffffff33",
                },
              }}
              style={styles.chart}
              showBarTops={false}
              fromZero
              segments={5}
            />
          </Card.Content>
        </Card>
      </Animated.View>
    );
  };

  const renderLoanSection = () => (
    <Animated.View
      style={[
        styles.loanContainer,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Surface style={styles.loanCard}>
        <LinearGradient
          colors={["#2e2e2e", "#1e1e1e"]}
          style={styles.gradientBackground}
        >
          <Title style={styles.loanTitle}>Loan Recommendation</Title>
          <LottieView
            source={require("../../assets/AI-animation-1.json")}
            autoPlay
            loop={false}
            style={styles.lottie}
          />
          <Text style={styles.loanAmount}>
            $
            {financialData.financialStatement.financialStatementAssessment.recommendedLoanAmount.toLocaleString()}
          </Text>
          <View style={styles.loanDetails}>
            <Text style={styles.loanText}>
              Interest Rate:{" "}
              {
                financialData.financialStatement.financialStatementAssessment
                  .interestRate
              }
            </Text>
            <Text style={styles.loanText}>
              Period:{" "}
              {
                financialData.financialStatement.financialStatementAssessment
                  .paymentPeriod
              }
            </Text>
          </View>
          <Button
            mode="contained"
            style={styles.applyButton}
            labelStyle={styles.buttonLabel}
            onPress={() => showModal("loan")}
          >
            Apply Now
          </Button>
        </LinearGradient>
      </Surface>
    </Animated.View>
  );

  return (
    <PaperProvider theme={theme}>
      <ScrollView style={styles.container}>
        {renderHeader()}
        {renderMetricsCard()}
        {renderCharts()}
        {renderLoanSection()}
      </ScrollView>
    </PaperProvider>
  );
};

const theme = {
  colors: {
    primary: "#FFD700",
    accent: "#ffffff",
    background: "#121212",
    surface: "#1e1e1e",
    text: "#ffffff",
    onSurface: "#ffffff",
  },
  roundness: 16,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  headerContainer: {
    padding: 16,
  },
  scoreCard: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
  },
  gradientBackground: {
    padding: 20,
    borderRadius: 16,
  },
  scoreTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  scoreValue: {
    color: "#FFD700",
    fontSize: 48,
    fontWeight: "bold",
    marginVertical: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 4,
    marginVertical: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFD700",
    borderRadius: 4,
  },
  businessState: {
    color: "#ffffff",
    fontSize: 16,
    marginTop: 8,
  },
  metricsCard: {
    margin: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
  },
  metricItem: {
    width: "48%",
    marginBottom: 16,
  },
  metricLabel: {
    color: "#ffffff99",
    fontSize: 14,
  },
  metricValue: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  chartsContainer: {
    padding: 16,
  },
  chartCard: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#2e2e2e",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartTitle: {
    color: "#ffffff",
    marginBottom: 16,
  },
  loanContainer: {
    padding: 16,
    marginBottom: 32,
  },
  loanCard: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
  },
  loanTitle: {
    color: "#ffffff",
    textAlign: "center",
  },
  lottie: {
    width: 120,
    height: 120,
    alignSelf: "center",
  },
  loanAmount: {
    color: "#FFD700",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  loanDetails: {
    alignItems: "center",
    marginBottom: 24,
  },
  loanText: {
    color: "#ffffff",
    fontSize: 16,
    marginVertical: 4,
  },
  applyButton: {
    backgroundColor: "#FFD700",
    borderRadius: 8,
    marginTop: 16,
  },
  buttonLabel: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FinancialAnalysisScreen;
