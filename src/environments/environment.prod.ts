const firebaseConfig = {
  apiKey: '{{PASTE_YOUR_API_KEY}}',
  authDomain: '{{PASTE_YOUR_AUTH_DOMAIN}}',
  databaseURL: '{{PASTE_YOUR_DATABASE_URL}}',
  projectId: '{{PASTE_YOUR_PROJECT_ID}}',
  storageBucket: '{{PASTE_YOUR_STORAGE_BUCKET}}',
  messagingSenderId: '{{PASTE_YOUR_MESSAGING_SENDER_ID}}',
  appId: '{{PASTE_YOUR_APP_ID}}'
};

const collectionsName = {
  chatMemberCollection: 'chat-members',
  chatMessagesCollection: 'chat-messages'
};

const production = true;

export const environment = {
  production,
  firebaseConfig,
  collectionsName
};
