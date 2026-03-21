/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { type Request } from "firebase-functions/https";


export type Response = Exclude<Request["res"], undefined>;
