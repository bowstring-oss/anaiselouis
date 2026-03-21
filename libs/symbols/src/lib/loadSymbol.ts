/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { type Symbol }     from "./interfaces";
import { type SymbolName } from "./types";


export function loadSymbol(symbolName: SymbolName): Promise<Symbol> {
  return import(`./_${ symbolName }`).then<Symbol>((module): Symbol => module.default);
}
