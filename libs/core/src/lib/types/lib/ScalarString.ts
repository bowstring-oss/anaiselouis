/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { type InverseVariableString } from "./InverseVariableString";
import { type PercentageString }      from "./PercentageString";
import { type PhiScalarString }       from "./PhiScalarString";
import { type PxScalarString }        from "./PxScalarString";
import { type RemScalarString }       from "./RemScalarString";
import { type VariableString }        from "./VariableString";


export type ScalarString =
  | InverseVariableString
  | PercentageString
  | PhiScalarString
  | PxScalarString
  | RemScalarString
  | VariableString
  | "0";
