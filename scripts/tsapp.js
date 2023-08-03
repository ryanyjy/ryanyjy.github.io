tsParticles.load("ts-particles", {
  fpsLimit: 60,
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        area: 800,
      },
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "image",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        sides: 5,
      },
      image: [
        {
          src: "images/blueParticle.png",
          width: 100,
          height: 100,
        },
        { src: "images/orangeParticle.png", width: 100, height: 100 },
      ],
    },
    opacity: {
      value: 0.8,
      random: true,
      animation: {
        enable: true,
        speed: 1,
        minimumValue: 0.1,
        sync: false,
      },
    },
    size: {
      value: 5,
      random: true,
      animation: {
        enable: true,
        speed: 1,
        minimumValue: 0,
        sync: false,
      },
    },
    links: {
      enable: false,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      outModes: {
        default: "out",
      },
    },
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      onHover: {
        enable: false,
        mode: "repulse",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 200,
        duration: 0.5,
      },
      push: {
        quantity: 5,
      },
    },
  },
});
