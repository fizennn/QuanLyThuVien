import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';


const AddBookForm = ({ onSubmit, theLoai }) => {
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
    { key: 'tenSach', placeholder: 'Tên sách' },
    { key: 'tacGia', placeholder: 'Tác giả' },
    { key: 'giaMuon', placeholder: 'Giá mượn' },
    { key: 'nxb', placeholder: 'Nhà xuất bản' },
    { key: 'moTa', placeholder: 'Mô tả' },
    { key: 'soLuongKho', placeholder: 'Số lượng trong kho' },
    { key: 'anh', placeholder: 'Link ảnh' },
  ];

  return (
    <View>
      {fields.map(({ key, placeholder }) => (
        <TextInput
          key={key}
          style={[styles.input, key === 'moTa' && styles.textArea]}
          placeholder={placeholder}
          value={book[key]}
          onChangeText={(text) => handleChange(key, text)}
          multiline={key === 'moTa'}
          numberOfLines={key === 'moTa' ? 4 : 1}
        />
      ))}
     
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={book.theLoai}
          onValueChange={(itemValue) => handleChange('theLoai', itemValue)}
          style={styles.picker}
        >
          {theLoai.map((loai, index) => (
            <Picker.Item key={index} label={loai.tenTheLoai} value={loai._id} />
          ))}
        </Picker>
      </View>
      
      <Button mode="contained" onPress={() => onSubmit(book)}>
        Thêm sách
      </Button>
    </View>
  );
};

export default AddBookForm;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f0f0f0',
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#f0f0f0',
    marginBottom: 12,
    borderRadius: 6,
    height: 50,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
  },
});