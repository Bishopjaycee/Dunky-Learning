import NetInfo from "@react-native-community/netinfo";

async function isNetworkAvailable() {
  const response = await NetInfo.fetch();
  return response.isConnected;
}

export const isConnected = async () => isNetworkAvailable();
