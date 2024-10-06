import { persistObservable, configureObservablePersistence } from '@legendapp/state/persist'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ObservablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage";
import { observable } from "@legendapp/state";

// Global configuration
configureObservablePersistence({
  // Use Local Storage on mobile
  pluginLocal: ObservablePersistAsyncStorage,
  localOptions: {
    asyncStorage: {
      AsyncStorage
    }
  }
});

// Create an observable object
export const user$ = observable({
  details: {
    username: '',
    isAuth: 0
  }
});

// Automatically persist user$
persistObservable(user$, {
  local: 'user-details'
});

// Update data persisted when needed
export const updateUserDetails = (details: userDetailsType) => {
  user$.set(previousDetails => ({
    ...previousDetails,
    ...details
  }));
};

export type userDetailsType = {
  username?: string;
  isAuth?: number;
};
