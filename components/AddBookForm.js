// AddBookForm.tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Text } from 'react-native';
import { Button, Divider, IconButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

const AddBookForm = ({ onSubmit, theLoai, onClose }) => {
  const [book, setBook] = useState({
    tenSach: '',
    tacGia: '',
    theLoai: theLoai[0]?._id || '',
    giaMuon: '',
    nxb: '',
    moTa: '',
    soLuongKho: '',
    anh: '',
  });

  const handleChange = (key, value) => {
    setBook(prev => ({ ...prev, [key]: value }));
  };

  const fields = [
    { key: 'tenSach', placeholder: 'Tên sách', label: 'Tên sách' },
    { key: 'tacGia', placeholder: 'Tác giả', label: 'Tác giả' },
    { key: 'giaMuon', placeholder: 'Giá mượn', label: 'Giá mượn' },
    { key: 'nxb', placeholder: 'Nhà xuất bản', label: 'Nhà xuất bản' },
    { key: 'moTa', placeholder: 'Mô tả sách', label: 'Mô tả' },
    { key: 'soLuongKho', placeholder: 'Số lượng trong kho', label: 'Số lượng trong kho' },
    { key: 'anh', placeholder: 'Link ảnh bìa sách', label: 'Link ảnh' },
  ];

  return (
    <ScrollView style={styles.container}>
      
      
      
      {fields.map(({ key, placeholder, label }) => (
        <View key={key} style={styles.inputGroup}>
          <Text style={styles.inputLabel}>{label}</Text>
          <TextInput
            style={[styles.input, key === 'moTa' && styles.textArea]}
            placeholder={placeholder}
            value={book[key]}
            onChangeText={(text) => handleChange(key, text)}
            multiline={key === 'moTa'}
            numberOfLines={key === 'moTa' ? 4 : 1}
            placeholderTextColor="#9E9E9E"
          />
        </View>
      ))}
     
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Thể loại</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={book.theLoai}
            onValueChange={(itemValue) => handleChange('theLoai', itemValue)}
            style={styles.picker}
            dropdownIconColor="#555"
          >
            {theLoai.map((loai, index) => (
              <Picker.Item 
                key={index} 
                label={loai.tenTheLoai} 
                value={loai._id}
                color="#333" 
              />
            ))}
          </Picker>
        </View>
      </View>
      
      <Button 
        mode="contained" 
        onPress={() => onSubmit(book)}
        style={styles.submitButton}
        labelStyle={styles.submitButtonLabel}
      >
        Thêm sách
      </Button>
    </ScrollView>
  );
};

export default AddBookForm;

const styles = StyleSheet.create({
  container: {
    height:550,
    flex: 1,
    padding: 0,
    backgroundColor: 'white',
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  pickerContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    height: 50,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 6,
    marginTop: 8,
    marginBottom: 24,
  },
  submitButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 2,
  },
});