export interface IVivusOptions {
  /**
   * Defines what kind of animation will be used:
   * delayed, sync, oneByOne, script, scenario or scenario-sync. [Default: delayed]
   * @type {string}
   * @memberof VivusOptions
   */
  type: string;
  /**
   * Link to the SVG to animate. If set, Vivus will create an object tag and append it to the DOM element given to the constructor. Be careful, use the onReady callback before playing with the Vivus instance.
   *
   * @type {string}
   * @memberof VivusOptions
   */
  file: string;
  /**
   * Defines how to trigger the animation (inViewport once the SVG is in the viewport, manual gives you the freedom to call draw method to start, autostart makes it start right now). [Default: inViewport]
   *
   * @type {string}
   * @memberof VivusOptions
   */
  start: string;
  /**
   * Animation duration, in frames. [Default: 200]
   *
   * @type {number}
   * @memberof VivusOptions
   */
  duration: number;
  /**
   * Time between the drawing of first and last path, in frames (only for delayed animations).
   *
   * @type {number}
   * @memberof VivusOptions
   */
  delay: number;
  /**
   * Function called when the instance is ready to play.
   *
   * @type {Function}
   * @memberof VivusOptions
   */
  onReady: Function;
  /**
   * Timing animation function for each path element of the SVG. Check the timing function part.
   *
   * @type {Function}
   * @memberof VivusOptions
   */
  pathTimingFunction: Function;
  /**
   * Timing animation function for the complete SVG. Check the timing function part.
   *
   * @type {Function}
   * @memberof VivusOptions
   */
  animTimingFunction: Function;
  /**
   * Whitespace extra margin between dashes. Increase it in case of glitches at the initial state of the animation. [Default: 2]
   *
   * @type {number}
   * @memberof VivusOptions
   */
  dashGap: number;
  /**
   * Force the browser to re-render all updated path items. By default, the value is true on IE only. (check the 'troubleshoot' section for more details).
   *
   * @type {boolean}
   * @memberof VivusOptions
   */
  forceRender: boolean;
  /**
   * Reverse the order of execution. The default behaviour is to render from the first 'path' in the SVG to the last one. This option allow you to reverse the order. [Default: false]
   *
   * @type {boolean}
   * @memberof VivusOptions
   */
  reverseStack: boolean;
  /**
   * Removes all extra styling on the SVG, and leaves it as original.
   *
   * @type {boolean}
   * @memberof VivusOptions
   */
  selfDestroy: boolean;
}
