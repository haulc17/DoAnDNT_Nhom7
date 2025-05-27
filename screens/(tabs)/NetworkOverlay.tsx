
import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

function useNetworkStatus(): boolean {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(!!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return isConnected;
}

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const NetworkOverlay: React.FC = () => {
  const isConnected = useNetworkStatus();

  if (isConnected) return null;

  return (
    <>
      {/* Lớp chặn thao tác toàn màn hình */}
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>
          Không có kết nối mạng. Vui lòng kiểm tra Wi-Fi hoặc 4G.
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    paddingHorizontal: 20,
  },
  overlayText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default NetworkOverlay;
