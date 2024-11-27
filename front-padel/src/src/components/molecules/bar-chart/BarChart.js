import PropTypes from "prop-types";
import { useMemo } from "react";

import { Bar } from "react-chartjs-2";

import { Box, useTheme } from "@mui/material";

const BarChart = ({ labels, data, t, "data-testid": dataTestId }) => {
  const theme = useTheme();

  const colorMap = useMemo(
    () => ({
      baby: theme.palette.primary.light,
      lighter: theme.palette.primary.main,
      info: theme.palette.primary.dark,
      dark: theme.palette.primary.dark,
    }),
    [theme.palette]
  );

  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: t("dashboard2.simsActiveNumber"),
          data,
          backgroundColor: colorMap.baby,
          borderColor: colorMap.dark,
          borderWidth: 1,
        },
      ],
    }),
    [labels, data, colorMap, t]
  );

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: t("dashboard2.services"),
        },
        grid: {
          display: true, // Asegurar que las líneas de la cuadrícula se muestren
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: t("dashboard2.simsActiveNumber"),
        },
        ticks: {
          callback: function (value) {
            return Number.isInteger(value) ? value : null; // Mostrar solo valores enteros
          },
          stepSize: Math.ceil(Math.max(...data) / 5), // Ajusta el tamaño de los pasos
          maxTicksLimit: 6, // Limitar el número máximo de ticks
        },
        grid: {
          display: true, // Asegurar que las líneas de la cuadrícula se muestren
        },
      },
    },
  };

  return (
    <Box data-testid={dataTestId}>
      <Bar data={chartData} options={options} />
    </Box>
  );
};

BarChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  t: PropTypes.func.isRequired,
  "data-testid": PropTypes.string,
};

export default BarChart;
