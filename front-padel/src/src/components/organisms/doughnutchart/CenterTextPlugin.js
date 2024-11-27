export const CenterTextPlugin = {
  id: "center",
  beforeDraw: function (chart) {
    if (chart.config.options.elements?.center) {
      const { ctx } = chart;

      const centerConfig = chart.config.options.elements.center;
      const { innerRadius } = chart.getDatasetMeta(chart.data.datasets.length - 1).controller;

      let centerX = chart.getDatasetMeta(0).data[0]?.x || 0,
        centerY = chart.getDatasetMeta(0).data[0]?.y || 0;

      const fontStyle = centerConfig.fontStyle || "Roboto";
      const txt = centerConfig.text;
      const count = centerConfig.count;
      const color = centerConfig.color || "#212121";
      const maxFontSize = centerConfig.maxFontSize || 75;
      const sidePadding = centerConfig.sidePadding || 20;
      const sidePaddingCalculated = (sidePadding / 100) * (innerRadius * 2);
      // Start with a base font of 16px
      ctx.font = "16px " + fontStyle;

      // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      const stringWidth = ctx.measureText(txt).width;
      const elementWidth = innerRadius * 2 - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      const widthRatio = elementWidth / stringWidth;
      const newFontSize = Math.floor(30 * widthRatio);
      const elementHeight = innerRadius * 2;

      // Pick a new font size so it will not be larger than the height of label.
      let fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
      let minFontSize = centerConfig.minFontSize;
      const lineHeight = centerConfig.lineHeight || 25;

      if (minFontSize === undefined) {
        minFontSize = 20;
      }

      if (minFontSize && fontSizeToUse < minFontSize) {
        fontSizeToUse = minFontSize;
      }

      // Set font settings to draw it correctly.
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.font = fontSizeToUse + "px " + fontStyle;
      ctx.fillStyle = color;

      let line = "";
      const lines = txt ? txt.split("\n") : [];

      // Move the center up depending on line height and number of lines
      centerY -= (lines.length / 2) * lineHeight;

      for (let n = 0; n < lines.length; n++) {
        ctx.fillText(lines[n], centerX, centerY);
        centerY += lineHeight;
      }
      // Draw text in center
      ctx.fillText(line, centerX, centerY);
      ctx.font = "bold 24px " + fontStyle;
      ctx.fillText(count, centerX, centerY);
    }
  },
};

export const radiusBackground = {
  beforeDraw: (chart) => {
    if (chart.options.radiusBackground) {
      const { ctx } = chart;

      const { innerRadius } = chart.getDatasetMeta(chart.data.datasets.length - 1).controller;
      const { outerRadius } = chart.getDatasetMeta(0).controller;
      const radiusLength = outerRadius - innerRadius;

      const x = chart.getDatasetMeta(0).data[0]?.x || 0,
        y = chart.getDatasetMeta(0).data[0]?.y || 0;

      ctx.beginPath();
      ctx.arc(x, y, outerRadius - radiusLength / 2, 0, 2 * Math.PI);
      ctx.lineWidth = radiusLength;
      ctx.strokeStyle = chart.options.radiusBackground.color || "#d1d1d1";
      ctx.stroke();
    }
  },
  id: "radius-background",
};
