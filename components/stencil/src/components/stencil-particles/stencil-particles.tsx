import { Component, Prop, h } from '@stencil/core';
import { Container, Engine, ISourceOptions, tsParticles } from 'tsparticles-engine';

@Component({
  tag: 'stencil-particles',
  shadow: true,
})
export class StencilParticles {
  /**
   * The id
   */
  @Prop() id: string;

  @Prop() options: ISourceOptions;

  @Prop() url: string;

  @Prop() particlesInit: (engine: Engine) => Promise<void>;

  @Prop() particlesLoaded: (container: Container) => Promise<void>;

  container?: Container;

  connectedCallback() {
    const cb = () => {
      const id = this.id ?? 'tsparticles',
        promise = this.url ? tsParticles.loadJSON(id, this.url) : tsParticles.load(id, this.options);

      promise.then(container => {
        this.container = container;
        this.particlesLoaded?.(container);
      });
    };

    if (this.particlesInit) {
      this.particlesInit(tsParticles).then(cb);
    } else {
      cb();
    }
  }

  componentDidUpdate() {
    if (!this.container) {
      return;
    }

    this.container.destroy();

    const id = this.id ?? 'tsparticles',
      promise = this.url ? tsParticles.loadJSON(id, this.url) : tsParticles.load(id, this.options);

    promise.then(container => {
      this.container = container;
      this.particlesLoaded?.(container);
    });
  }

  render() {
    return (
      <div id={this.id}>
        <canvas></canvas>
      </div>
    );
  }
}
