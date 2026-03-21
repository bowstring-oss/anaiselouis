/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { type Environment } from "@bowstring/core";


export const environment: Environment = {
  app:        "website",
  apis:       {
    firebase:  {
      apiKey:            "AIzaSyCcasfsrWS09sXD727U2jvI17Wsu-vIK3o",
      appId:             "1:926777881944:web:bbbb12c5c5b4dd1b41612d",
      authDomain:        "anaiselouis-787a5.firebaseapp.com",
      databaseURL:       "https://anaiselouis-787a5-default-rtdb.firebaseio.com",
      measurementId:     "G-FLRZPG7CND",
      messagingSenderId: "926777881944",
      projectId:         "anaiselouis-787a5",
      storageBucket:     "anaiselouis-787a5.firebasestorage.app",
    },
    recaptcha: { siteKey: "6Lc1rZEsAAAAAAKP0By29o2ZVMliXC4mJe2nuoFs" },
  },
  production: false,
};
