// AddGenreForm.tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Text, Divider, IconButton } from 'react-native-paper';

const colorOptions = ['#FF5733', '#33C1FF', '#33FF57', '#FF33A1', '#8E44AD', '#F1C40F'];

const AddGenreForm = ({ onSubmit, onClose }) => {
  const [genre, setGenre] = useState({ tenTheLoai: '', mau: colorOptions[0] });

  const handleChange = (value) => {
    setGenre(prev => ({ ...prev, tenTheLoai: value }));
  };
  

  const selectColor = (color) => {
    setGenre(prev => ({ ...prev, mau: color }));
  };

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Tên thể loại</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên thể loại"
          value={genre.tenTheLoai}
          onChangeText={handleChange}
          placeholderTextColor="#9E9E9E"
        />
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Chọn màu hiển thị</Text>
        <View style={styles.colorsContainer}>
          {colorOptions.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorBox,
                { backgroundColor: color },
                genre.mau === color && styles.selectedColorBox,
              ]}
              onPress={() => selectColor(color)}
            >
              {genre.mau === color && (
                <View style={styles.checkmark} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.previewContainer}>
        <Text style={styles.previewLabel}>Xem trước:</Text>
        <View style={[styles.previewTag, { backgroundColor: genre.mau }]}>
          <Text style={styles.previewText}>
            {genre.tenTheLoai || 'Tên thể loại'}
          </Text>
        </View>
      </View>
      
      <Button 
        mode="contained" 
        onPress={() => onSubmit(genre)}
        style={styles.submitButton}
        labelStyle={styles.submitButtonLabel}
        disabled={!genre.tenTheLoai.trim()}
      >
        Thêm thể loại
      </Button>
    </ScrollView>
  );
};

export default AddGenreForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 8,
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
  colorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  colorBox: {
    width: 50,
    height: 50,
    marginRight: 12,
    marginBottom: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  selectedColorBox: {
    borderWidth: 2,
    borderColor: '#333',
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  previewContainer: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  previewLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 12,
  },
  previewTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  previewText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 6,
    marginBottom: 24,
  },
  submitButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 2,
  },
});