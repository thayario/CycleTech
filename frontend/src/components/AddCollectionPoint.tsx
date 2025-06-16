import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Chip,
  Stack,
  Alert
} from '@mui/material';
import axios from 'axios';

const AddCollectionPoint: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    latitude: '',
    longitude: '',
    description: '',
    acceptedMaterials: [] as string[]
  });

  const [newMaterial, setNewMaterial] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddMaterial = () => {
    if (newMaterial.trim()) {
      setFormData(prev => ({
        ...prev,
        acceptedMaterials: [...prev.acceptedMaterials, newMaterial.trim()]
      }));
      setNewMaterial('');
    }
  };

  const handleRemoveMaterial = (material: string) => {
    setFormData(prev => ({
      ...prev,
      acceptedMaterials: prev.acceptedMaterials.filter(m => m !== material)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/collection-points', {
        ...formData,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude)
      });
      setSuccess('Ponto de coleta adicionado com sucesso!');
      setFormData({
        name: '',
        address: '',
        phone: '',
        latitude: '',
        longitude: '',
        description: '',
        acceptedMaterials: []
      });
    } catch (error) {
      setError('Erro ao adicionar ponto de coleta. Tente novamente.');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Adicionar Novo Ponto de Coleta
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nome"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          margin="normal"
        />

        <TextField
          fullWidth
          label="Endereço"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
          margin="normal"
        />

        <TextField
          fullWidth
          label="Telefone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          margin="normal"
        />

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleInputChange}
            required
            type="number"
          />

          <TextField
            fullWidth
            label="Longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleInputChange}
            required
            type="number"
          />
        </Box>

        <TextField
          fullWidth
          label="Descrição"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          multiline
          rows={4}
          margin="normal"
        />

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Materiais Aceitos
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              label="Novo Material"
              value={newMaterial}
              onChange={(e) => setNewMaterial(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleAddMaterial}
              disabled={!newMaterial.trim()}
            >
              Adicionar
            </Button>
          </Box>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {formData.acceptedMaterials.map((material, index) => (
              <Chip
                key={index}
                label={material}
                onDelete={() => handleRemoveMaterial(material)}
              />
            ))}
          </Stack>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Cadastrar Ponto de Coleta
        </Button>
      </Box>
    </Paper>
  );
};

export default AddCollectionPoint; 