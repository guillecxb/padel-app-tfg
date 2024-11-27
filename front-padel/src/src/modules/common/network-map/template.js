import { CONNECTION_STATUS } from "modules/enumerations";

const _base = (children, { deviceName, siteName = "No Site name", palette }) => {
  return `<div style="position: relative;box-sizing: border-box; display: flex; flex-direction: column; align-items: flex-start; padding: 8px; min-width: 254px; background: ${palette.background.paper}; border: 1px solid #6E7894; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15); border-radius: 8px;">
    <div style="display: flex; flex-direction: row; align-items: center;">
      <div style="font-style: normal; font-weight: 600; font-size: 16px;line-height: 24px; color: ${palette.text.primary};">${siteName}</div>
      <div style="background: linear-gradient(99.09deg, #0066FF 0%, #59C2C9 100%), #FFFFFF; margin: 0 8px; width: 1px; height: 24px"></div>
      <div style="font-style: normal; font-weight: 600; font-size: 16px;line-height: 24px; color: ${palette.text.primary};">${deviceName}</div>
    </div>
    <div style="margin-top: 4px">
      ${children}
    </div>
    <div style="position: absolute; bottom:-10px; left: 50%; margin-left: -19px;  width: 0;height: 0;border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 10px solid #6E7894; display:block;">
      <span style="position: absolute; bottom: 2px; left: -8px; width: 0;height: 0;border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 9px solid ${palette.background.paper};"></span>
    </div>
  </div>`;
};

const arrowDropDown = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="#0066FF" d="M21.757 7.943a1.304 1.304 0 0 0-1.182-.711L3.452 7.08c-.524-.01-1 .27-1.196.698a1.03 1.03 0 0 0 .275 1.24l8.56 7.575a1.407 1.407 0 0 0 1.815 0l8.56-7.423c.356-.3.473-.798.291-1.227Z"/></svg>`;
const arrowDropUp = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="#0066FF" d="m21.486 14.99-8.572-7.574a1.41 1.41 0 0 0-1.817 0l-8.57 7.423a1.044 1.044 0 0 0-.28 1.23c.197.423.656.703 1.174.709l17.138.15c.52 0 .986-.274 1.185-.7a1.041 1.041 0 0 0-.275-1.238h.017Z"/></svg>`;

const _throughput = (icon, value, textColor) => {
  return `<div style="display: flex; flex-direction: row; justify-content: center; align-items: center; gap: 6px; padding: 4px 12px 3px 8px; background: #E1F5FE; border-radius: 999px;">
    ${icon}
    <span style="color: ${textColor}; font-weight: 600; font-size: 14px;">${value.value} ${value.unit}</span>
  </div>`;
};

export const tooltipTemplate = (data, palette) => {
  const { ALL_CONNECTED, ALL_DISCONNECTED, ALL_SUSPENDED, SOME_CONNECTED } = CONNECTION_STATUS;
  let template = "";
  const { connection, site } = data;
  const {
    status,
    sim_group_name,
    connected,
    uplink_throughput,
    downlink_throughput,
    sim_ids,
    disconnected,
  } = connection;
  const total = sim_ids?.length ?? 0;

  switch (status) {
    case ALL_CONNECTED:
    case SOME_CONNECTED: {
      template = `<div style="font-size: 16px;">
      <div style="color: ${
        status === SOME_CONNECTED ? palette.warning.dark : palette.success.main
      };">${connected}/${total} connected SIM cards</div>
      <div style="color: ${
        palette.text.secondary
      }; padding-top: 16px; text-transform: uppercase; font-size: 14px;">Uplink/downlink througput</div>
      <div style="margin-top: 8px; display: flex; flex-direction: row; align-items: center; gap: 8px">
        ${_throughput(arrowDropUp, uplink_throughput, palette.info.dark)}
        ${_throughput(arrowDropDown, downlink_throughput, palette.info.dark)}
      </div>
    </div>`;
      break;
    }
    case ALL_DISCONNECTED:
      template = `<div style="color: ${palette.error.main}; font-size: 16px;">${disconnected}/${total} connected SIM cards</div>`;
      break;
    case ALL_SUSPENDED:
      template = `<div style="color: ${palette.text.secondary}; font-size: 16px;">Suspended</div>`;
      break;
  }

  return _base(template, {
    palette,
    deviceName: sim_group_name,
    siteName: site?.name,
  });
};

export const badgeTemplate = (total, color) => {
  return `<p style="background-color: ${color}; color: #F2F4FF; font-size: 11px; border-radius: 99px; width: 20px; height: 20px; display: flex; flex-direction: row; justify-content: center;align-items: center;">
    <span>${total}</span>
  </p>`;
};
