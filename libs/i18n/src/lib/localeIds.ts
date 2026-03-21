/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import messagesLib from "./messages";


export const localeIds: Array<keyof typeof messagesLib> = Object.keys(messagesLib) as Array<keyof typeof messagesLib>;
