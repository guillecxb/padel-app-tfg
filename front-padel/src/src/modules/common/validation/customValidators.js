export const IP_REGEX = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
export const IP_RANGE_REGEX =
  /^([01]?\d\d?|2[0-4]\d|25[0-5])(?:\.(?:[01]?\d\d?|2[0-4]\d|25[0-5])){3}(\/([0-9]|[1-2][0-9]|3[0-2]))$/;
export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[ñ@$\-\.!%*#?&])[A-Za-z\dñ@$\-\.!%*#?&]{8,}$/;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 50;
export const LOGIN_MAX_LENGTH = 255;
export const LOGIN_MIN_LENGTH = 4;
export const MAC_ADDRESS_REGEX = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
