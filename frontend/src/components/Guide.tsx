import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon
} from '@mui/icons-material';

const Guide: React.FC = () => {
  const materials = [
    {
      title: 'Eletrônicos',
      description: 'Computadores, celulares, tablets e outros dispositivos eletrônicos',
      tips: [
        'Remova dados pessoais antes do descarte',
        'Procure pontos de coleta específicos para eletrônicos',
        'Verifique se o local aceita o tipo específico de equipamento'
      ],
      dangers: [
        'Contém metais pesados como chumbo e mercúrio',
        'Pode contaminar o solo e a água',
        'Riscos de explosão em caso de descarte inadequado'
      ]
    },
    {
      title: 'Pilhas e Baterias',
      description: 'Pilhas alcalinas, baterias de celular, baterias de notebook',
      tips: [
        'Não misture com lixo comum',
        'Procure pontos de coleta em supermercados e lojas de eletrônicos',
        'Armazene em local seco até o descarte'
      ],
      dangers: [
        'Vazamento de substâncias tóxicas',
        'Risco de contaminação do solo',
        'Perigo de explosão em altas temperaturas'
      ]
    },
    {
      title: 'Lâmpadas',
      description: 'Lâmpadas fluorescentes, LED e outras',
      tips: [
        'Embrulhe em jornal antes do descarte',
        'Procure pontos de coleta específicos',
        'Não quebre a lâmpada'
      ],
      dangers: [
        'Contém mercúrio (lâmpadas fluorescentes)',
        'Risco de corte com cacos',
        'Contaminação do ar em caso de quebra'
      ]
    }
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Guia de Descarte Adequado
      </Typography>
      <Typography variant="body1" paragraph>
        Este guia fornece informações importantes sobre como descartar corretamente
        diferentes tipos de materiais tóxicos e eletrônicos, ajudando a proteger
        o meio ambiente e a saúde pública.
      </Typography>

      {materials.map((material, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{material.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" paragraph>
              {material.description}
            </Typography>

            <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                Dicas de Descarte
              </Typography>
              <List>
                {material.tips.map((tip, tipIndex) => (
                  <ListItem key={tipIndex}>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary={tip} />
                  </ListItem>
                ))}
              </List>
            </Paper>

            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                <WarningIcon color="error" sx={{ mr: 1 }} />
                Riscos do Descarte Inadequado
              </Typography>
              <List>
                {material.dangers.map((danger, dangerIndex) => (
                  <ListItem key={dangerIndex}>
                    <ListItemIcon>
                      <WarningIcon color="error" />
                    </ListItemIcon>
                    <ListItemText primary={danger} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </AccordionDetails>
        </Accordion>
      ))}

      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          <InfoIcon color="info" sx={{ mr: 1 }} />
          Informações Adicionais
        </Typography>
        <Typography variant="body1" paragraph>
          Para mais informações sobre pontos de coleta e descarte adequado,
          consulte o mapa interativo ou entre em contato com a prefeitura
          de sua cidade.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Guide; 