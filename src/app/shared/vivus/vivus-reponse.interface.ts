export interface IVivusReponse {
  /**
   * Plays the animation with the speed given in parameter. This value can be negative to go backward, between 0 and 1 to go slowly, >1 to go faster, or <0 to go in reverse from current state. [Default: 1]. Callback executed after the animation is finished (optional)=>{}
   *
   * @memberof IVivusWrapper
   */
  play: (speed, callback) => {};
  /**
   * Stops the animation.
   *
   * @memberof IVivusWrapper
   */
  stop: () => {};
  /**
   * Reinitialises the SVG to the original state: undrawn.
   *
   * @memberof IVivusWrapper
   */
  reset: () => {};
  /**
   * Set the SVG to the final state: drawn.
   *
   * @memberof IVivusWrapper
   */
  finish: () => {};
  /**
   * Set the progress of the animation. Progress must be a number between 0 and 1.
   *
   * @memberof IVivusWrapper
   */
  setFrameProgress: (progress) => {};
  /**
   * Get the status of the animation between start, progress, end
   *
   * @memberof IVivusWrapper
   */
  getStatus: () => {};
  /**
   * Reset the SVG but make the instance out of order.
   *
   * @memberof IVivusWrapper
   */
  destroy: () => {};
}
