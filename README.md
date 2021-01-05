## Optro License Client for Trello Power-ups

This library enables you to easily integrate your Trello Power-up with the Optro Market for Pro Power-up licensing.

### How to use?

We're currently finalizing the API and Vendor interface, but this provides a sneak peak at what is coming soon!

The library is distributed as an 'npm' module and can be used in a few different ways:

#### [Option A] Recommended: Using in Back-end (e.g. Express)
1. Install the library `npm install optro-license-client node-fetch`
3. Instantiate the client with `const licenseClient = new OptroLicenseClient("apiKey", "powerUpId", "10m", "2m")`
3. Call the method and use conditionals to limit featureset `licenseClient.getBoardLicenseStatus("board-id")`
4. You've successfully implemented license checking in your Power-up from the server-side

#### [Option B] Using in Front-end with Module (e.g. React)

This is the most flexible but least secure option for implementing licensing checking.

1. Install the library with `npm install optro-license-client`
2. Import the class with `import {OptroLicenseClient} from "optro-license-client";`
3. Instantiate the client with `const licenseClient = new OptroLicenseClient("apiKey", "powerUpId", "10m", "2m")`
3. Call the method and use conditionals to limit featureset `licenseClient.getBoardLicenseStatus("board-id")`
4. You've successfully implemented license checking in your Power-up from the client-side

#### [Option C] Using in Front-end with Vanilla JS

You can include the library as a standard included script and then call it from your javascript, this is useful when you're not using a libary like React or Angular (commonly with Webpack).

`<script src="/optro-license-client.js"></script>`

### Contributing

We welcome contributions to the source code - just raise a Pull Request!

### License

MIT License

### About Optro

[Optro Market](https://www.optro.cloud) is the best place to discover new Pro Power-ups for Trello.

Use this SDK to hook into the Optro Market API and generate revenue from your innovative Power-up ideas!
