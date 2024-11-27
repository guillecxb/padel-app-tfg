import { validIcons } from "components/molecules/muistica-icon-selector/MuisticaIconSelector";

import { getNodeIcon, getInternetIcon } from "./icons";

export const layout = {
  name: "preset",
  fit: true,
  directed: false,
  animationDuration: 700,
  /*padding: 4,
      // Divisor to compute edge forces
      edgeElasticity: 0.45,
      componentSpacing: 40,
      // Nesting factor (multiplier) to compute ideal edge length for inter-graph edges
      nestingFactor: 0.1,
      // Type of layout animation. The option set is {'during', 'end', false}
      animate: 'end',
      quality: "proof",
      // spacingFactor: 1.5,
      // Whether to include labels in node dimensions. Useful for avoiding label overlap
      nodeDimensionsIncludeLabels: true,
      //coolingFactor: 0.99,
      //nestingFactor: 1.2,
      numIter: 2000,
      randomize: true,
      //refresh: 20,
      animationDuration: 700,
      avoidOverlap: true,
      //nodeDimensionsIncludeLabels: false,
      transform: function (node, position) {
        return position;
      }*/
};

export const styleSheet = async ({ palette: { network } }) => {
  const deviceIcons = await Promise.all(
    validIcons.map(async (icon) => {
      return {
        selector: `node.${icon}`,
        style: {
          backgroundImage: await getNodeIcon(icon, network.iconGradient),
        },
      };
    })
  );
  return [
    ...deviceIcons,
    {
      selector: "node.virtual",
      style: {
        backgroundImage: getInternetIcon("internet", network.iconGradient),
      },
    },
    {
      selector: "node.physical",
      style: {
        backgroundImage: () => {
          const svgFile = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="${network.site.icon}" d="M5.83 2.155h12.331c.636 0 1.216.574 1.219 1.202V20.64c0 .638-.569 1.201-1.216 1.201h-4.05v-5.507a.407.407 0 0 0-.406-.409h-3.42a.407.407 0 0 0-.407.41v5.506h-4.05c-.647 0-1.216-.56-1.216-1.201V3.357c0-.628.58-1.202 1.216-1.202Zm4.88 6.034a.407.407 0 0 0 .407-.41V5.164a.407.407 0 0 0-.407-.409H8.122a.407.407 0 0 0-.406.41V7.78c0 .224.182.409.406.409h2.588Zm5.524-.41V5.164a.407.407 0 0 0-.406-.409H13.24a.407.407 0 0 0-.406.41V7.78c0 .224.182.409.406.409h2.588a.407.407 0 0 0 .406-.41Zm0 5.138v-2.62a.409.409 0 0 0-.406-.408H13.24a.407.407 0 0 0-.406.409v2.619c0 .224.182.409.406.409h2.588a.407.407 0 0 0 .406-.41Zm-5.117 0v-2.62a.409.409 0 0 0-.407-.408H8.122a.407.407 0 0 0-.406.409v2.619c0 .224.182.409.406.409h2.588a.407.407 0 0 0 .407-.41Z"/></svg>`;
          return "data:image/svg+xml;utf8," + encodeURIComponent(svgFile);
        },
      },
    },
    {
      selector: "node",
      style: {
        backgroundColor: "#ebf5fd",
        width: 64,
        height: 64,
        label: "data(label)",
        /*"text-halign": "center",*/
        "overlay-padding": "1px",
        "z-index": "10",
        color: network.nodeLabel.color,
        fontSize: "8px",
      },
    },
    {
      selector: "node[label]",
      style: {
        backgroundColor: network.nodeLabel.background,
        "text-valign": "bottom",
        "text-wrap": "wrap",
        /*"text-halign": "center",*/
        "text-background-color": "white",
        "text-background-opacity": 1,
        "overlay-padding": "1px",
        "z-index": 100,
        color: network.nodeLabel.color,
        fontSize: "8px",
      },
    },
    {
      selector: "node[label][type='device']",
      style: {
        color: network.nodeLabel.color,
        "text-background-color": network.nodeLabel.background,
        "text-background-opacity": 0,
        "text-valign": "center",
        "text-halign": "left",
        "text-margin-x": "-6px",
      },
    },
    {
      selector: "node[label][type='site']",
      style: {
        color: network.nodeLabel.color,
        "text-background-color": network.nodeLabel.background,
        "text-background-opacity": 0,
        "font-weight": "bold",
        "text-margin-y": "5px",
      },
    },
    {
      selector: ":parent",
      css: {
        "text-valign": "top",
        "text-halign": "center",
      },
    },
    {
      selector: "edge[label]",
      css: {
        label: "data(label)",
        "text-rotation": "autorotate",
        "text-margin-x": "10px",
        "text-margin-y": "10px",
        fontSize: "8px",
      },
    },
    {
      selector: "node:selected",
      style: {
        "border-width": "1px",
        "border-color": "#AAD8FF",
        "border-opacity": "0.5",
      },
    },
    {
      selector: "node[type='device']",
      style: {
        shape: "round",
        background: "#F2F4FF",
        width: "40px",
        height: "40px",
      },
    },
    {
      selector: "node[type='site']",
      style: {
        shape: "round",
        backgroundFill: "linear-gradient",
        "background-gradient-direction": "to-right",
        "background-gradient-stop-colors": `${network.site.from} ${network.site.to}`,
        "background-gradient-stop-positions": "0 100",
        width: "64px",
        height: "64px",
      },
    },
    {
      selector: "node[type='connectivity']",
      style: {
        shape: "round",
        background: "#F2F4FF",
      },
    },
    {
      selector: "edge",
      style: {
        width: 1,
        "curve-style": "taxi",
        "taxi-turn-min-distance": 10,
        "taxi-turn": "50%",
        // "line-color": "#6774cb",
        "line-style": "solid",
        "line-color": "#0066FF",
        "target-arrow-color": "#0066FF",
        "source-arrow-color": "#0066FF",
        "target-arrow-shape": "circle",
        "source-arrow-shape": "circle",
        "arrow-scale": 0.5,
      },
    },
    {
      selector: "edge.Connected",
      style: {
        "taxi-direction": "upward",
        "line-color": "#4CAF50",
        "target-arrow-color": "#4CAF50",
        "source-arrow-color": "#4CAF50",
      },
    },
    {
      selector: "edge.Some_Connected",
      style: {
        width: 1,
        "taxi-direction": "leftward",
        "line-color": "#FFC107",
        "target-arrow-color": "#FFC107",
        "source-arrow-color": "#FFC107",
      },
    },
    {
      selector: "edge.Disconnected",
      style: {
        width: 1,
        "taxi-direction": "leftward",
        "taxi-turn": "45%",
        "line-style": "dashed",
        "line-color": "#F44336",
        "target-arrow-color": "#F44336",
        "source-arrow-color": "#F44336",
        /*"taxi-direction": "downward",
          "taxi-turn": 20,
          "taxi-turn-min-distance": 5,*/
      },
    },
    {
      selector: "edge.Suspended",
      style: {
        "taxi-turn": "40%",
        "line-style": "dashed",
        "taxi-direction": "rightward",
        "line-color": "#D1D5E4",
        "target-arrow-color": "#D1D5E4",
        "source-arrow-color": "#D1D5E4",
      },
    },
  ];
};
