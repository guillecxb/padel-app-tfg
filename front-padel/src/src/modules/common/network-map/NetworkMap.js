import PropTypes from "prop-types";
import { useMemo, useRef, useEffect, useCallback, useState } from "react";

import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import popper from "cytoscape-popper";
import nodeHtmlLabel from "cytoscape-node-html-label";

import { useTheme } from "@mui/material";

import { CONNECTION_STATUS } from "modules/enumerations";

import { layout, styleSheet } from "./cytoscapeConfig";
import { badgeTemplate, tooltipTemplate } from "./template";

cytoscape.use(popper);
nodeHtmlLabel(cytoscape);

export const NetworkMap = ({ sites, connections, alerts, width, height, onTap }) => {
  const theme = useTheme();
  const itemsPerRow = 3;
  const [themedStyleSheet, setThemedStyleSheet] = useState([]);
  const calculateDeviceYPos = useCallback((idx) => {
    const result = Math.floor(idx / itemsPerRow);
    return result * 250;
  }, []);

  const calculateDeviceXPos = useCallback((idx) => {
    const result = (idx % itemsPerRow) + 1;
    return result * 100;
  }, []);

  const graphData = useMemo(() => {
    if (!connections || !sites) {
      return { edges: [], nodes: [] };
    }

    const simGroups = connections.reduce(
      (acc, currConn) =>
        acc.find((conn) => conn.id === currConn.sim_group_id)
          ? acc
          : [
              ...acc,
              {
                id: currConn.sim_group_id,
                name: currConn.sim_group_name,
                simsCount: currConn.sim_ids?.length,
                icon: currConn.sim_group_icon,
                alerts: alerts.filter((alert) => alert.site_id === currConn.site_id).length,
              },
            ],
      []
    );

    // NOW sort simGroups
    const priorities = Object.values(CONNECTION_STATUS);
    simGroups.sort((a, b) => priorities.indexOf(a.status) - priorities.indexOf(b.status));

    const nodes = [
      ...simGroups.map((sGroup, idx) => ({
        data: {
          id: `simGroup-${sGroup.id}`,
          label: `${sGroup.name}\n(${sGroup.simsCount ?? 0} sims)`,
          alerts: sGroup.alerts,
          type: "device",
        },
        classes: [sGroup.icon],
        position: {
          x: calculateDeviceXPos(idx),
          y: calculateDeviceYPos(idx),
        },
      })),
      ...sites.map((site, idx) => ({
        data: { id: `site-${site.id}`, label: site.name, type: "site" },
        classes: ["physical"],
        position: { x: idx * 200 + 150, y: 125 },
      })),
    ];

    const edges = connections
      ? connections.map((conn) => ({
          data: {
            target: `simGroup-${conn.sim_group_id}`,
            source: sites.find((site) => site.id === conn.site_id)
              ? `site-${conn.site_id}`
              : undefined,
            label: "",
            connection: conn,
            site: sites.find((site) => site.id === conn.site_id),
          },
          classes: conn.status,
        }))
      : [];

    return {
      nodes,
      edges,
    };
  }, [alerts, calculateDeviceXPos, calculateDeviceYPos, connections, sites]);

  const cyRef = useRef(null);
  const cyPopperRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    const cy = cyRef.current;

    if (!!cy) {
      cy.nodeHtmlLabel([
        {
          query: "node[type='device']",
          valign: "center",
          halign: "right",
          valignBox: "top",
          halignBox: "left",
          tpl: function (data) {
            return data.alerts ? badgeTemplate(data.alerts, theme.palette.error.dark) : "";
          },
        },
      ]);

      // create a basic popper on the first node
      cy.edges().on("mouseover", (event) => {
        boxRef.current.innerHTML = tooltipTemplate(event.target[0].data(), theme.palette);
        cyPopperRef.current = event.target.popper({
          content: boxRef.current,
          renderedPosition: () => event.renderedPosition,
          popper: {
            placement: "top",
            removeOnDestroy: true,
          },
        });
      });

      cy.edges().on("mouseout", () => {
        boxRef.current.innerHTML = "";
        if (cyPopperRef) {
          cyPopperRef.current.destroy();
        }
      });

      cy.on("tap", "node", (evt) => {
        const node = evt.target;
        const nodeData = node.data();
        onTap(nodeData);
      });

      cy.on("tap", "edge", (evt) => {
        const node = evt.target;
        const nodeData = node.data();
        onTap(nodeData);
      });

      cy.on("resize", () => {
        cy.fit(undefined, 25);
      });
    }
  }, [boxRef, onTap, theme]);

  useEffect(() => {
    const fetch = async () => await styleSheet(theme);
    fetch().then((result) => {
      setThemedStyleSheet(result);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          ref={boxRef}
          style={{
            position: "absolute",
            zIndex: 1000,
            backgroundColor: "transparent",
            color: "white",
          }}
        />
        <div data-testid="network-map-canvas">
          <CytoscapeComponent
            autoungrabify={true}
            autounselectify={false}
            boxSelectionEnabled={false}
            cy={(cy) => {
              cyRef.current = cy;
            }}
            elements={CytoscapeComponent.normalizeElements(graphData)}
            layout={layout}
            maxZoom={4}
            minZoom={1}
            panningEnabled={true}
            style={{ width, height, background: theme.palette.background.paper }}
            stylesheet={themedStyleSheet}
            userPanningEnabled={false}
            /*abc={console.log("myCyRef", myCyRef)}*/
          />
        </div>
      </div>
    </>
  );
};

NetworkMap.defaultProps = {
  width: "100%",
  height: "500px",
  alerts: [],
};

NetworkMap.propTypes = {
  sites: PropTypes.array,
  connections: PropTypes.array,
  alerts: PropTypes.array,
  width: PropTypes.string,
  height: PropTypes.string,
  onTap: PropTypes.func,
};
