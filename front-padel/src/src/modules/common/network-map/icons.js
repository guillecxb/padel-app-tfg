import axios from "axios";

import { misticaSvgs } from "components/atoms/muistica-icon/MuisticaIcon";

const getGradient = (from, to) => {
  return `<defs>
    <linearGradient id="gradient">
      <stop offset="0%" style="stop-color:${from};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${to};stop-opacity:1" />
    </linearGradient>
  </defs>`;
};

export const getNodeIcon = async (iconName, { from, to }) => {
  const icon = misticaSvgs.find((svg) => svg.path.includes(`${iconName}-filled`));
  const gradient = getGradient(from, to);

  const { data } = await axios.get(icon.file, { baseUrl: window.location.origin });
  const iconSrc = data
    .replace(' fill="none">', ` fill="none">${gradient}`)
    .replaceAll("#313235", "url(#gradient)");

  return "data:image/svg+xml;utf8," + encodeURIComponent(iconSrc || "");
};

export const getInternetIcon = (iconName, { from, to }) => {
  const gradient = getGradient(from, to);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">${gradient}<path fill="url(#gradient)" d="M14.195 2.98c-.535-.41-1.1-.67-1.686-.782h-.003v-.056c2.888.087 5.154.899 6.737 2.426.977.946 1.686 2.15 2.117 3.607h-4.215c-.27-1.114-.656-2.14-1.152-3.028-.512-.924-1.117-1.652-1.798-2.168ZM7.691 5.147c-.496.888-.882 1.914-1.151 3.028h-3.9c.432-1.456 1.138-2.663 2.118-3.607 1.563-1.507 3.793-2.323 6.633-2.423v.02c-.66.086-1.3.358-1.902.814-.678.516-1.283 1.247-1.798 2.168ZM21.517 15.243c.233-.98.348-2.062.348-3.244 0-.97-.079-1.871-.236-2.706h-4.257a17.126 17.126 0 0 1-.096 5.95h4.241Z"/><path fill="url(#gradient)" d="M7.694 8.175c.238-.91.566-1.748.972-2.476.762-1.367 1.714-2.199 2.722-2.392v4.868H7.694ZM15.811 16.444c-.204.642-.467 1.26-.792 1.852-.709 1.269-1.58 2.075-2.51 2.341v-4.193h3.302ZM11.388 20.685v-4.243H7.876c.202.64.468 1.263.793 1.851.759 1.367 1.711 2.202 2.72 2.392ZM6.313 9.293a17.128 17.128 0 0 0-.213 2.703c-.003 1.09.1 2.177.31 3.247H2.487c-.232-.98-.347-2.062-.347-3.244.003-.972.081-1.871.235-2.706h3.939ZM11.388 9.296H7.45c-.154.893-.23 1.795-.23 2.703-.002 1.09.11 2.18.337 3.246h3.831v-5.95ZM12.509 3.357c.93.264 1.801 1.073 2.51 2.342.406.728.734 1.566.972 2.476h-3.482V3.357ZM16.234 9.296H12.51v5.947h3.619a15.41 15.41 0 0 0 .336-3.247 15.58 15.58 0 0 0-.23-2.7ZM9.486 21.016c.603.456 1.241.73 1.902.815v.017c-2.837-.101-5.067-.913-6.63-2.42-.837-.805-1.473-1.805-1.91-2.986h3.854c.255.876.586 1.686.986 2.406.516.921 1.12 1.652 1.798 2.168ZM16.98 16.442a11.546 11.546 0 0 1-.987 2.406c-.512.921-1.12 1.652-1.798 2.168-.538.406-1.1.67-1.686.781v.056c2.888-.084 5.151-.899 6.734-2.423.835-.806 1.476-1.804 1.913-2.986H16.98v-.002Z"/></svg>`;
};
