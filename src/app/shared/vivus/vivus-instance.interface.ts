export interface IVivusInstance {
  animTimingFunction: Function;
  callback: Function;
  currentFrame: number;
  dashGap: number;
  delay: number;
  delayUnit: number;
  duration: number;
  el: any;
  forceRender: boolean;
  frameLength: number;
  handle: any;
  ignoreInvisible: boolean;
  instanceCallback: Function;
  isIE: boolean;
  isReady: boolean;
  map: SVGPathElement[];
  onReady: Function;
  parentEl: any;
  pathTimingFunction: Function;
  reverseStack: boolean;
  selfDestroy: boolean;
  speed: number;
  start: string;
  type: string;
}
