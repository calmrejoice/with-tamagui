Things included:

1. Tamagui
2. Firebase
   - login
   - firestore
   - storage
3. Glassfy

Instructions to start:

- npm i
- Rename name, slug, scheme in app.json
- Delete EAS project id in app.json
- change firebaseConfig
- setup sign in method in firebase
- create .env and input keys
- yarn ios

Commands:
eas build:configure
eas build
eas build -p ios --profile production --auto-submit
