import DashboardScreen from "../../screens/DashboardScreen";

const Routes = {
  Auth: {
    Login: "Login",
    RegisterBasic: "RegisterBasic",
    RegisterAdvance: "RegisterAdvance",
  },
  App: {
    DashboardScreen: "Dashboard Screen",
    Profile: "ProfileScreen",
    Settings: "SettingsScreen",
  },
  Onboard: {
    OnboardWelcome: "OnboardWelcome",
    OnboardAddBusiness: "OnboardAddBusiness",
    Settings: "SettingsScreen",
  },
  LoanRequest: {
    LoanDashboard: "Loan dashboard",
    LoanRequestIntro: "Loan Request Intro",
    LoanRequestDetails: "Loan Request Details",
    LoanRequestAmount: "Loan Request Amount",
    LoanRequestBankSelection: "LoanRequestBankSelection",
    LoanRequestReview: "Loan Request Review",
    LoanResponseViewAll: "Loan Response View All",
  },
};

export default Routes;
