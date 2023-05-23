import { LatLngExpression } from "leaflet";
const POSITION_MANILA = [14.5995, 120.9842] as LatLngExpression;
// FIXME: naming and structure
export const AppConfig = {
  minZoom: 2,
  maxZoom: 18, // max zoom level of CARTO: 18
  defaultZoom: 5,
  ui: {
    topBarHeight: 80,
    bigIconSize: 48,
    mapIconSize: 32,
    markerIconSize: 36,
    menuIconSize: 16,
    topBarIconSize: 24,
  },
  baseCenter: POSITION_MANILA,
};

export enum NavMenuVariant {
  INTRO = "vertical",
  TOPNAV = "horizontal",
}
