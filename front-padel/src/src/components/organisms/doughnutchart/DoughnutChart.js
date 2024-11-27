import "chart.js/auto";

import { lazy, useMemo, Suspense } from "react";
import { PropTypes } from "prop-types";

import { Chart as ChartJS } from "chart.js";

import { useTheme, Skeleton } from "@mui/material";

import { CenterTextPlugin, radiusBackground } from "./CenterTextPlugin";

const AsyncDoughnut = lazy(() =>
  import("react-chartjs-2").then(({ Doughnut }) => ({ default: Doughnut }))
);
ChartJS.register(radiusBackground);
ChartJS.register(CenterTextPlugin);

export const DoughnutChart = ({
  data,
  legendData,
  legendTitle,
  centerTitle,
  tooltipData,
  "data-testid": dataTestid,
  color = "info",
  activeUnitaryLabel = "",
  activeManyLabel = "",
  inactiveUnitaryLabel = "",
  inactiveManyLabel = "",
}) => {
  const theme = useTheme();
  const colorMap = useMemo(
    () => ({
      baby: theme.palette[color].baby,
      lighter: theme.palette[color].lighter,
      info: theme.palette[color].main,
      dark: theme.palette[color].dark,
    }),
    [color, theme.palette]
  );

  const chartOptions = useMemo(
    () => ({
      cutout: "70%",
      radiusBackground: {
        color: "#d1d1d1", // Color del fondo que no está coloreado al cargar
      },
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 2,
      layout: {
        padding: 0,
        margin: 0,
      },
      plugins: {
        legend: {
          display: Boolean(legendData?.length),
          position: "right",
          align: "middle",
          title: {
            display: !!legendTitle,
            text: legendTitle,
            font: {
              size: 20,
              family: "Sans Regular",
              weight: 600,
            },
            color: theme.palette.text.primary,
          },
          labels: {
            boxWidth: 15,
            color: theme.palette.text.secondary,
            font: {
              size: 14,
            },
            padding: 16,
            usePointStyle: true,
            pointStyle: "rectRounded",
          },
        },
        tooltip: {
          displayColors: false,
          callbacks: {
            label: (context) => {
              return tooltipData.length ? tooltipData[context.dataIndex] : undefined;
            },
            title: (context) => `${context[0].label.split("\t")[0]}`,
          },
        },
      },
      elements: {
        arc: {
          borderWidth: 0,
        },
        center: {
          text: centerTitle,
          color: theme.palette.text.primary,
          count: `${data.reduce((partialSum, a) => partialSum + a, 0)}`,
          fontStyle: "Sans Regular",
          maxFontSize: 20,
          minFontSize: 10, // Default is 20 (in px), set to false and text will not wrap.
          lineHeight: 28, // Default is 25 (in px), used for when text wraps
        },
      },
    }),
    [
      centerTitle,
      data,
      legendData,
      legendTitle,
      theme.palette.text.primary,
      theme.palette.text.secondary,
      tooltipData,
    ]
  );

  const chartData = useMemo(() => {
    const chartColors = [colorMap.dark, colorMap.info, colorMap.lighter, colorMap.baby];

    return {
      labels: legendData.map((elem, idx) => {
        const labelType = idx === 0 ? activeManyLabel : inactiveManyLabel;
        const unitaryLabelType = idx === 0 ? activeUnitaryLabel : inactiveUnitaryLabel;
        return `${elem}\t\t\t\t\t\t\t${data[idx]} ${
          data[idx] === 1 ? unitaryLabelType : labelType
        }`;
      }),
      datasets: [
        {
          data,
          backgroundColor: chartColors,
          borderColor: "white",
          borderWidth: 1,
        },
      ],
    };
  }, [
    colorMap.baby,
    colorMap.dark,
    colorMap.info,
    colorMap.lighter,
    data,
    legendData,
    activeManyLabel,
    inactiveManyLabel,
    activeUnitaryLabel,
    inactiveUnitaryLabel,
  ]);

  return (
    <Suspense fallback={<Skeleton height={270} width={270} />}>
      <AsyncDoughnut data={chartData} data-testid={dataTestid} options={chartOptions} />
    </Suspense>
  );
};

DoughnutChart.propTypes = {
  centerTitle: PropTypes.string,
  data: PropTypes.array.isRequired,
  legendData: PropTypes.array.isRequired,
  legendTitle: PropTypes.string,
  "data-testid": PropTypes.string,
  color: PropTypes.string,
  tooltipData: PropTypes.arrayOf(PropTypes.string), // Cambiado a array de strings
  activeUnitaryLabel: PropTypes.string,
  activeManyLabel: PropTypes.string,
  inactiveUnitaryLabel: PropTypes.string,
  inactiveManyLabel: PropTypes.string,
};
