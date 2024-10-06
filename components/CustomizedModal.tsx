import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import tw from "twrnc";
import { Colors } from '@/constants/DefaultColors';

export default function CustomizedModal({ isVisible, children, onClose, title }: Props) {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0/0.5)' }}>
        <View style={styles.modalContent}>
          {title && (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Choose a sticker</Text>
              <Pressable onPress={onClose}>
                <MaterialIcons name="close" color={Colors.neutral
                  ._000
                } size={22} />
              </Pressable>
            </View>
          )}
          {children}
        </View>
      </View>
    </Modal>
  );
}

interface Props {
  isVisible: boolean;
  children?: React.JSX.Element | string;
  onClose: () => void;
  title?: string;
};

const styles = StyleSheet.create({
  modalContent: {
    height: '20%',
    width: '70%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 10
  },
  titleContainer: {
    height: '20%',
    backgroundColor: 'transparent',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.neutral._000,
    fontSize: 18,
  },
});
