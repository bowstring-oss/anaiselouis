/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { type FirebaseError } from "@angular/fire/app";


export function getAuthErrorMessage({ code }: FirebaseError): string {
  switch (code) {
    case "auth/account-exists-with-different-credential":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Account-Exists-With-Different-Credential:An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.`;
    case "auth/admin-restricted-operation":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Admin-Restricted-Operation:This operation is restricted to administrators only.`;
    case "auth/already-initialized":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Already-Initialized:initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.`;
    case "auth/app-deleted":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--App-Deleted:This instance of FirebaseApp has been deleted.`;
    case "auth/app-not-authorized":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--App-Not-Authorized:This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.`;
    case "auth/app-not-installed":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--App-Not-Installed:The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.`;
    case "auth/auth-domain-config-required":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Auth-Domain-Config-Required:Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.`;
    case "auth/cancelled-popup-request":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Cancelled-Popup-Request:This operation has been cancelled due to another conflicting popup being opened.`;
    case "auth/captcha-check-failed":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Captcha-Check-Failed:The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.`;
    case "auth/code-expired":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Code-Expired:The SMS code has expired. Please re-send the verification code to try again.`;
    case "auth/cordova-not-ready":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Cordova-Not-Ready:Cordova framework is not ready.`;
    case "auth/cors-unsupported":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Cors-Unsupported:This browser is not supported.`;
    case "auth/credential-already-in-use":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Credential-Already-In-Use:This credential is already associated with a different user account.`;
    case "auth/custom-token-mismatch":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Custom-Token-Mismatch:The custom token corresponds to a different audience.`;
    case "auth/dependent-sdk-initialized-before-auth":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Dependent-Sdk-Initialized-Before-Auth:Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call \`initializeAuth\` or \`getAuth\` before starting any other Firebase SDK.`;
    case "auth/dynamic-link-not-activated":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Dynamic-Link-Not-Activated:Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.`;
    case "auth/email-already-in-use":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Email-Already-In-Use:The email address is already in use by another account.`;
    case "auth/email-change-needs-verification":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Email-Change-Needs-Verification:Multi-factor users must always have a verified email.`;
    case "auth/emulator-config-failed":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Emulator-Config-Failed:Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.`;
    case "auth/expired-action-code":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Expired-Action-Code:The action code has expired.`;
    case "auth/internal-error":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Internal-Error:An internal AuthError has occurred.`;
    case "auth/invalid-action-code":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Action-Code:The action code is invalid. This can happen if the code is malformed, expired, or has already been used.`;
    case "auth/invalid-api-key":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Api-Key:Your API key is invalid, please check you have copied it correctly.`;
    case "auth/invalid-app-credential":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-App-Credential:The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.`;
    case "auth/invalid-app-id":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-App-Id:The mobile app identifier is not registered for the current project.`;
    case "auth/invalid-auth-event":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Auth-Event:An internal AuthError has occurred.`;
    case "auth/invalid-cert-hash":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Cert-Hash:The SHA-1 certificate hash provided is invalid.`;
    case "auth/invalid-continue-uri":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Continue-Uri:The continue URL provided in the request is invalid.`;
    case "auth/invalid-cordova-configuration":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Cordova-Configuration:The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.`;
    case "auth/invalid-credential":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Credential:The supplied auth credential is incorrect, malformed or has expired.`;
    case "auth/invalid-custom-token":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Custom-Token:The custom token format is incorrect. Please check the documentation.`;
    case "auth/invalid-dynamic-link-domain":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Dynamic-Link-Domain:The provided dynamic link domain is not configured or authorized for the current project.`;
    case "auth/invalid-email":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Email:The email address is badly formatted.`;
    case "auth/invalid-emulator-scheme":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Emulator-Scheme:Emulator URL must start with a valid scheme (http:// or https://).`;
    case "auth/invalid-message-payload":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Message-Payload:The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.`;
    case "auth/invalid-multi-factor-session":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Multi-Factor-Session:The request does not contain a valid proof of first factor successful sign-in.`;
    case "auth/invalid-oauth-client-id":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Oauth-Client-Id:The OAuth client ID provided is either invalid or does not match the specified API key.`;
    case "auth/invalid-oauth-provider":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Oauth-Provider:EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.`;
    case "auth/invalid-persistence-type":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Persistence-Type:The specified persistence type is invalid. It can only be local, session or none.`;
    case "auth/invalid-phone-number":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Phone-Number:The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].`;
    case "auth/invalid-provider-id":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Provider-Id:The specified provider ID is invalid.`;
    case "auth/invalid-recaptcha-action":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Recaptcha-Action:The reCAPTCHA action is invalid when sending request to the backend.`;
    case "auth/invalid-recaptcha-token":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Recaptcha-Token:The reCAPTCHA token is invalid when sending request to the backend.`;
    case "auth/invalid-recaptcha-version":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Recaptcha-Version:The reCAPTCHA version is invalid when sending request to the backend.`;
    case "auth/invalid-recipient-email":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Recipient-Email:The email corresponding to this action failed to send as the provided recipient email address is invalid.`;
    case "auth/invalid-req-type":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Req-Type:Invalid request parameters.`;
    case "auth/invalid-sender":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Sender:The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.`;
    case "auth/invalid-tenant-id":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Tenant-Id:The Auth instance's tenant ID is invalid.`;
    case "auth/invalid-user-token":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-User-Token:This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.`;
    case "auth/invalid-verification-code":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Verification-Code:The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.`;
    case "auth/invalid-verification-id":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Invalid-Verification-Id:The verification ID used to create the phone auth credential is invalid.`;
    case "auth/maximum-second-factor-count-exceeded":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Maximum-Second-Factor-Count-Exceeded:The maximum allowed number of second factors on a user has been exceeded.`;
    case "auth/missing-android-pkg-name":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Missing-Android-Pkg-Name:An Android Package Name must be provided if the Android App is required to be installed.`;
    case "auth/missing-app-credential":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Missing-App-Credential:The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.`;
    case "auth/missing-client-type":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Missing-Client-Type:The reCAPTCHA client type is missing when sending request to the backend.`;
    case "auth/missing-continue-uri":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Missing-Continue-Uri:A continue URL must be provided in the request.`;
    case "auth/missing-iframe-start":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Missing-Iframe-Start:An internal AuthError has occurred.`;
    case "auth/missing-ios-bundle-id":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Missing-Ios-Bundle-Id:An iOS Bundle ID must be provided if an App Store ID is provided.`;
    case "auth/missing-multi-factor-info":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Missing-Multi-Factor-Info:No second factor identifier is provided.`;
    case "auth/missing-multi-factor-session":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Missing-Multi-Factor-Session:The request is missing proof of first factor successful sign-in.`;
    case "auth/missing-or-invalid-nonce":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Missing-Or-Invalid-Nonce:The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.`;
    case "auth/missing-phone-number":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Missing-Phone-Number:To send verification codes, provide a phone number for the recipient.`;
    case "auth/missing-recaptcha-token":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Missing-Recaptcha-Token:The reCAPTCHA token is missing when sending request to the backend.`;
    case "auth/missing-recaptcha-version":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Missing-Recaptcha-Version:The reCAPTCHA version is missing when sending request to the backend.`;
    case "auth/missing-verification-code":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Missing-Verification-Code:The phone auth credential was created with an empty SMS verification code.`;
    case "auth/missing-verification-id":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Missing-Verification-Id:The phone auth credential was created with an empty verification ID.`;
    case "auth/multi-factor-auth-required":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Multi-Factor-Auth-Required:Proof of ownership of a second factor is required to complete sign-in.`;
    case "auth/multi-factor-info-not-found":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Multi-Factor-Info-Not-Found:The user does not have a second factor matching the identifier provided.`;
    case "auth/network-request-failed":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Network-Request-Failed:A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.`;
    case "auth/no-auth-event":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--No-Auth-Event:An internal AuthError has occurred.`;
    case "auth/no-such-provider":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--No-Such-Provider:User was not linked to an account with the given provider.`;
    case "auth/null-user":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Null-User:A null user object was provided as the argument for an operation which requires a non-null user object.`;
    case "auth/operation-not-allowed":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Operation-Not-Allowed:The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.`;
    case "auth/operation-not-supported-in-this-environment":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Operation-Not-Supported-In-This-Environment:This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.`;
    case "auth/popup-blocked":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Popup-Blocked:Unable to establish a connection with the popup. It may have been blocked by the browser.`;
    case "auth/popup-closed-by-user":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Popup-Closed-By-User:The popup has been closed by the user before finalizing the operation.`;
    case "auth/provider-already-linked":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Provider-Already-Linked:User can only be linked to one identity for the given provider.`;
    case "auth/quota-exceeded":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Quota-Exceeded:The project's quota for this operation has been exceeded.`;
    case "auth/recaptcha-not-enabled":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Recaptcha-Not-Enabled:reCAPTCHA Enterprise integration is not enabled for this project.`;
    case "auth/redirect-cancelled-by-user":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Redirect-Cancelled-By-User:The redirect operation has been cancelled by the user before finalizing.`;
    case "auth/redirect-operation-pending":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Redirect-Operation-Pending:A redirect sign-in operation is already pending.`;
    case "auth/rejected-credential":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Rejected-Credential:The request contains malformed or mismatching credentials.`;
    case "auth/requires-recent-login":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Requires-Recent-Login:This operation is sensitive and requires recent authentication. Log in again before retrying this request.`;
    case "auth/second-factor-already-in-use":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Second-Factor-Already-In-Use:The second factor is already enrolled on this account.`;
    case "auth/tenant-id-mismatch":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Tenant-Id-Mismatch:The provided tenant ID does not match the Auth instance's tenant ID.`;
    case "auth/timeout":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Timeout:The operation has timed out.`;
    case "auth/too-many-requests":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Too-Many-Requests:We have blocked all requests from this device due to unusual activity. Try again later.`;
    case "auth/unauthorized-continue-uri":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Unauthorized-Continue-Uri:The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.`;
    case "auth/unauthorized-domain":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Unauthorized-Domain:This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.`;
    case "auth/unsupported-first-factor":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Unsupported-First-Factor:Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.`;
    case "auth/unsupported-persistence-type":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Unsupported-Persistence-Type:The current environment does not support the specified persistence type.`;
    case "auth/unsupported-tenant-operation":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Unsupported-Tenant-Operation:This operation is not supported in a multi-tenant context.`;
    case "auth/unverified-email":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Unverified-Email:The operation requires a verified email.`;
    case "auth/user-cancelled":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--User-Cancelled:The user did not grant your application the permissions it requested.`;
    case "auth/user-disabled":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--User-Disabled:The user account has been disabled by an administrator.`;
    case "auth/user-mismatch":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--User-Mismatch:The supplied credentials do not correspond to the previously signed in user.`;
    case "auth/user-not-found":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--User-Not-Found:There is no user record corresponding to this identifier. The user may have been deleted.`;
    case "auth/user-token-expired":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--User-Token-Expired:The user's credential is no longer valid. The user must sign in again.`;
    case "auth/weak-password":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Weak-Password:The password must be 6 characters long or more.`;
    case "auth/web-storage-unsupported":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Web-Storage-Unsupported:This browser is not supported or 3rd party cookies and data may be disabled.`;
    case "auth/wrong-password":
      return $localize`:@@libs--Firebase-Interop--Errors--Auth--Wrong-Password:The password is invalid or the user does not have a password.`;
    default:
      return $localize`Something went wrong.`;
  }
}
