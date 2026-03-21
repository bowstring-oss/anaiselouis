/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import messagesLib from "./messages";


export const translations: Record<keyof typeof messagesLib, typeof messagesLib[keyof typeof messagesLib]["translations"]> = Object.fromEntries<typeof messagesLib[keyof typeof messagesLib]["translations"]>(Object.entries<typeof messagesLib[keyof typeof messagesLib]>(messagesLib).map<[ keyof typeof messagesLib, typeof messagesLib[keyof typeof messagesLib]["translations"] ]>((messagesLibEntry: [ string, typeof messagesLib[keyof typeof messagesLib] ]): [ keyof typeof messagesLib, typeof messagesLib[keyof typeof messagesLib]["translations"] ] => [ messagesLibEntry[0] as keyof typeof messagesLib, messagesLibEntry[1].translations ])) as Record<keyof typeof messagesLib, typeof messagesLib[keyof typeof messagesLib]["translations"]>;
