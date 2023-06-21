export const msalConfig = {
  auth: {
    clientId: "990a7780-5408-4b44-9721-386582496e8a",
    authority: "https://vjinhualioutlook.ciamlogin.com/",
    redirectUri: "http://localhost:3000/",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const protectedResources = {
  server: {
    endpoint: "https://localhost:7066/WeatherForecast",
    scopes: {
      read: ["api://f65cc09b-62d9-47d0-996d-99cab56476ba/Data.Read"],
    },
  },
  graph: {
    endpoint: "https://graph.microsoft.com/v1.0/me",
    scopes: {
      read: ["User.Read"],
    },
  },
};

export const loginRequest = {
  scopes: [
    ...protectedResources.graph.scopes.read,
    ...protectedResources.server.scopes.read,
  ],
};
