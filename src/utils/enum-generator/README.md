# Enum Gatherer Script for Web

This project contains a web-based script that gathers all enums from a specified API and consolidates them into a single TypeScript file. The enum names and keys are automatically converted to PascalCase for consistency and readability.

## Features

- Fetches enum data from a given API using Axios.
- Converts enum names and keys to PascalCase.
- Generates a TypeScript enum file with proper formatting and comments.
- Supports both string and numeric enum values.

## Getting Started

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Edge).
- A basic understanding of JavaScript/TypeScript.

### Installation

To use this script in a web environment, follow these steps:

1. **Clone or Download the Project:**
   - Clone the repository using Git:
     ```bash
     git clone https://github.com/yourusername/enum-gatherer-web.git
     ```
   - Or download the ZIP file and extract it.

2. **Open the Project:**
   - Open the `index.html` file in your web browser.

### Running the Script

1. **Open the Script:**
   - Open the `index.html` file in a web browser. This file contains a simple UI that triggers the enum gathering process.

2. **Fetch and Generate Enums:**
   - Click the "Fetch Enums" button on the web page. The script will fetch the enum data from the API, process it, and display the TypeScript code on the page.

3. **Copy the Output:**
   - Copy the generated TypeScript code from the web page and paste it into your desired file.

### Example Output

```typescript
export enum BannerTypeEnum {
  Homepage = 'homepage', // Homepage
  Reseller = 'reseller', // Reseller
  HomepageSliderFooter = 'homepagesliderfooter', // Homepage slider footer
  HomepageFooter = 'homepagefooter', // Homepage footer
}

export enum BillToEnum {
  Supplier = 1, // Supplier
  Customer = 2, // Customer
  Factory = 3, // Factory
}
```

### Customization

You can modify the API endpoints or adjust the PascalCase conversion logic by editing the JavaScript file in the `script.js` file.

### API Endpoints Requirements

- **Enum List:** The script uses `https://staging.f2cfurniture.com/api/enums` to fetch the list of enums.
- **Enum Detail:** The script uses `https://staging.f2cfurniture.com/api/enums/{detail}` to fetch each enum's details.

## Contributing

If you have any suggestions or improvements, feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License.