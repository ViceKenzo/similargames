// Rework dis shit
import ReactGA from "react-ga";

const GA_TRACKING_CODE = "UA-225470478-1";

function GAFirePageView(info) {
  ReactGA.initialize(GA_TRACKING_CODE);
  ReactGA.pageview(info);
}

function GAFireEvent(category, action, label) {
  ReactGA.initialize(GA_TRACKING_CODE);
  ReactGA.event({ category, action, label });
}

export { GAFirePageView, GAFireEvent };
