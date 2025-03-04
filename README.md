# Shloanik

**Shloanik** is a centralized platform that allows business owners to apply for loans and receive responses from banks in the form of offers. Banks can compete and counter-offer, providing business owners with the best possible terms. Shloanik streamlines the loan application process using AI-powered insights, OCR, and electronic signatures, ensuring a seamless experience for both business owners and bankers.

<div align="center">
<img src="https://github.com/user-attachments/assets/f1216c7d-6786-46a9-87c0-1695595a927a" alt="drawing" width="300"/>
   <img src="https://github.com/user-attachments/assets/f1216c7d-6786-46a9-87c0-1695595a927a" alt="drawing" width="300"/>
</div>

## Features

- **Loan Application & Responses**: Business owners can apply for loans and receive counter-offers from competing banks.
- **AI-Powered Financial Analysis**: Business owners upload financial statements and business licenses, which AI analyzes to extract insights like profits, assets, liabilities, equity, and more.
- **OCR for Document Processing**: Optical Character Recognition (OCR) extracts data from uploaded documents, reducing the need for manual input.
- **Loan Request Details**: Business owners can specify loan amounts, repayment plans, and provide reasons for the loan request to convince bankers.
- **Electronic Signature**: Business owners can sign loan offers electronically before accepting them.
- **Banker Interactions**: Bankers can accept, negotiate, or reject loan offers.
- **Biometric Authentication**: Utilize fingerprint or face recognition to authenticate users and refresh expired access tokens.

<div align="center">
<img src="https://github.com/user-attachments/assets/f1216c7d-6786-46a9-87c0-1695595a927a" alt="drawing" width="300"/>
</div>

## Tools and Technologies

The following tools and technologies are used in the development of Shloanik:

- **React Native**: Framework for building the mobile application.
- **React Native Paper**: UI library for consistent design and components.
- **React Native SVG**: For signing loan offers electronically.
- **React Native Maps**: For map functionality and marking.
- **Expo Local Authentication**: For biometric authentication on mobile devices.
- **Spring Boot Mail**: For sending emails related to loan requests.
- **Apache PDFBox**: For working with PDFs, such as loan agreements.
- **Redis**: Caching layer for faster data retrieval.
- **Docker/Docker-Compose**: Containerization for consistent deployment and environment setup.
- **Stable Diffusion**: For generating profile images and business logos using open-source models obtained from Civitai.
- **LottieView**: For JSON-based animations within the app.
- **Animated (React Native)**: For creating vector animations.

<div align="center">
<img src="https://github.com/user-attachments/assets/f1216c7d-6786-46a9-87c0-1695595a927a" alt="drawing" width="300"/>
</div>

## How It Works

1. **Business Owner Registration**: The business owner registers and uploads necessary documents (financial statements, business license).
2. **AI Analysis**: The system analyzes the documents and generates business insights, visualizing profits, assets, liabilities, and equity.
3. **Loan Application**: The business owner submits a loan application, specifying the loan amount, repayment plan, and the reason for the loan.
4. **Bank Response**: Banks review the application and can either accept, negotiate, or reject the loan offer.
5. **Loan Acceptance**: Once an offer is accepted, the business owner electronically signs the loan agreement.
6. **Loan Disbursement**: The loan is processed and disbursed upon agreement.

<div align="center">
<img src="https://github.com/user-attachments/assets/f1216c7d-6786-46a9-87c0-1695595a927a" alt="drawing" width="300"/>
</div>

## Installation

To run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Salem8ALM/capstoneMobile.git
   ```

2. Navigate to the project directory:
   ```bash
   cd shloanik
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the app on an emulator or device:
   ```bash
   npx react-native run-android # For Android
   npx react-native run-ios # For iOS
   ```
<div align="center">
<img src="https://github.com/user-attachments/assets/f1216c7d-6786-46a9-87c0-1695595a927a" alt="drawing" width="300"/>
</div>

## Environment Setup

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Android Studio / Xcode](https://reactnative.dev/docs/environment-setup)
- [Docker](https://www.docker.com/)

<div align="center">
<img src="https://github.com/user-attachments/assets/f1216c7d-6786-46a9-87c0-1695595a927a" alt="drawing" width="300"/>
</div>

## Contributing

We welcome contributions to Shloanik! If you want to contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

<div align="center">
<img src="https://github.com/user-attachments/assets/f1216c7d-6786-46a9-87c0-1695595a927a" alt="drawing" width="300"/>
</div>

## License

Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">
<img src="https://github.com/user-attachments/assets/f1216c7d-6786-46a9-87c0-1695595a927a" alt="drawing" width="300"/>
</div>

## Acknowledgements

- **Open-source models from Civitai** for generating logos and profile images.
- **OCR** for document processing.
- **AI-powered insights** for extracting data from business documents.

```

This `README.md` covers the main aspects of your project, including features, tools, and setup instructions. Let me know if you'd like any additional information or changes!
