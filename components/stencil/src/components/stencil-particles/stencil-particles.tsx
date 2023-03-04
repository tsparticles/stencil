import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'stencil-particles',
  shadow: true,
})
export class StencilParticles {
  /**
   * The id
   */
  @Prop() id: string;

  render() {
    return <div></div>;
  }
}
