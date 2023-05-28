export default {
  scrollBehavior(to: any, from: any, savedPosition: any) {
    if (savedPosition) return savedPosition;

    if (to.hash || to.path == from.path) {
      if (to.hash === "") return;
      const el = document.querySelector(to.hash);
      return { top: el.offsetTop - 100, left: 0, behavior: "smooth" };
    }

    return {
      top: 0,
      left: 0,
    };
  },
};
