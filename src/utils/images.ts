import * as ImagePicker from 'expo-image-picker';
import { Directory, File, Paths } from 'expo-file-system';
import { Alert } from 'react-native';

const savePhoto = async (uri: string) => {
    const folder = new Directory(Paths.document, 'photos');
    if (!folder.exists) folder.create();
    
    const file = new File(folder, `${Date.now()}.jpg`);
    await new File(uri).copy(file);
    return file.uri;
};

export const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.7,
    });

    if (result.canceled) return undefined;
    
    return savePhoto(result.assets[0].uri);
};

export const pickPhotos = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: true,
        quality: 0.7,
    });

    if (result.canceled) return [];
    
    return Promise.all(result.assets.map((asset) => savePhoto(asset.uri)));
};

export const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    
    if (!permission.granted) {
        Alert.alert('Camera access needed', 'Allow camera access in Settings to take pictures.');
        return undefined;
    }
    
    const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.7
    });
    
    if (result.canceled) return undefined;
    
    return savePhoto(result.assets[0].uri);
};