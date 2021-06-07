## Optro API Client

![optro-sdk](https://img.shields.io/badge/Optro-SDK-blue)
![npm](https://img.shields.io/npm/v/@optro/ui-react)
![npm bundle size](https://img.shields.io/bundlephobia/min/@optro/ui-react)
[![Release Package](https://github.com/optro-cloud/optro-api-client/actions/workflows/main.yml/badge.svg)](https://github.com/optro-cloud/optro-api-client/actions/workflows/main.yml)

This library enables you to easily integrate your Trello Power-up with the Optro Market for Pro Power-up licensing.

### How to use?

We're currently finalizing the API and Vendor interface, but this provides a sneak peak at what is coming soon!

The library is distributed as an 'npm' module and can be used in a few different ways:

#### [Option A] Recommended: Use the Optro Trello Dev Tools

We have created a suite of tools to make creating Power-Ups with built-in licensing as easy as possible, with React, TypeScript, Webpack all setup for you:

 * Use the Trello Power-Up Generator (`npx create-trello-powerup`) to create a Power-Up based on your selection of capabilities and features to enable
 * Use the Trello Power-Up Template as a basis for your own Power-Up, based on best practices.

#### [Option B] Using Javascript with NPM/Yarn (Node.js and Browser compatible)

Using the Optro API Client from your Server-side is the most robust strategy to enforce licensing restrictions - it allows you to have complete control over the behaviour of your Power-Up and the different conditions.

1. Install the library (and node-fetch if using from server-side ie. Node.js)

   ```
   npm install @optro/api-client node-fetch
   ```

2. Import the API Class

   ```
   import {OptroLicenseApi} from "@optro/api-client/dist";
   ```

3. Create a Client with your Power-Up Details

   ```
   const optroClient = new OptroLicenseApi("OPTRO_API_KEY", "POWERUP_ID");
   ```

4. Call the license check that matches your Power-Up's licensing model in Optro

   ```
   // if using TypeScript
   import { OptroLicenseResponse } from "@optro/api-client/dist/types/types";
   
   // check license status of board + power-up pair using the client
   const t = window.TrelloPowerUp.iframe();
   const boardId: string = t.getContext().board;
   const licenseStatus: OptroLicenseResponse = await optroClient.getBoardLicenseStatus(boardId);
   
   // or check license status of member + power-up pair using client
   const t = window.TrelloPowerUp.iframe();
   const memberId: string = t.getContext().member;
   const licenseStatus: OptroLicenseResponse = await optroClient.getMemberLicenseStatus(memberId);
   
   // then check whether they are registered and licensed to use your Power-Up on a paid plan
   return licenseStatus.isRegistered && licenseStatus.isLicensed();
   ```
   
5. You can use your own interface to provide information on the license applied, or using the `@optro/ui-react` library you can pass these values to the `SubscriptionStatus` React Component and have these rendered in a clean and consistent way across all Optro-licensed Power-Ups, with internationalization support.

#### [Option C] Using in Front-end with Vanilla JS

You can include the library as a standard script and then call it from your javascript, this is useful when you're not using a libary like React or Angular (commonly with Webpack).

```
<script src="@optro/api-client/dist/cache.js"></script>
<script src="@optro/api-client/dist/api.js"></script>
<script src="@optro/api-client/dist/index.js"></script>
<script>
var t = window.TrelloPowerUp.iframe({appKey: "APP_KEY", appName: "APP_NAME"});
var client = new OptroLicenseApi("OPTRO_API_KEY", "POWERUP_ID);
client.getBoardLicenseStatus(t.getContext().board).then(function(result) {
   var status = result.isRegistered && result.isLicensed;
   // Do something with the status, such as restrict features or render a message)
}).catch(function(error) {
   console.error(error);
});
</script>
```

### API Docs

There are a few parameters that can be set when you're using the Optro API Client:

#### Instantiating the Client

Before you can call a function provided by the Client, you first have to instantiate it, for example:

```
const client = new OptroLicenseApi("OPTRO-API-KEY", "POWER-UP-ID", "CACHE-MAX-AGE", "CACHE-INTERVAL);
```

 * OPTRO-API-KEY - Your Optro API Key which can be obtained from your account on [Optro Vendors](https://vendor.optro.cloud)
 * POWER-UP-ID - Your Power-Up ID, which can be obtained from the [Power-Up Admin Page](https://www.trello.com/power-ups/admin)
 * CACHE-MAX-AGE - (Optional) Choose how long entries can be stored for - e.g. "10m"
 * CACHE-INTERVAL - (Optional) Choose at what interval the cache should refresh values - e.g. "2m"

#### Performing a License Check

When you'd like to check whether a Board or Member is licensed, you can call one of the following commands:

```
const boardLicenseStatus: OptroLicenseResponse = client.getBoardLicenseStatus("TRELLO-BOARD-ID");
const memberLicenseStatus: OptroLicenseResponse = client.getMemberLicenseStatus("TRELLO-MEMBER-ID");

console.log(boardLicenseStatus);

{
    isLicensed: true,
    isRegistered: true
}
``` 

You can use the returned values to determine what level of features to provide to the board or member in your Power-Up, as well as pass it to the License UI Components in the front-end to provide access for users to upgrade and manage their subscription.

### Contributing

We welcome contributions to the source code - just raise a Pull Request!

### License

This library is provided under the MIT License.

The API that this library uses (https://api.optro.cloud) is proprietary and is provided under commercial terms.

### About Optro

[Optro Market](https://www.optro.cloud) is the best place to discover new Pro Power-ups for Trello.

Use this SDK to hook into the Optro Market API and generate revenue from your innovative Power-up ideas!
