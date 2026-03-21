/*
 * Copyright © 2026 Gavin William Sawyer. All rights reserved.
 */

import { Pipe, PipeTransform } from "@angular/core";


type TwoToFifty =
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50;

@Pipe(
  {
    name: "bowstringGetQuantityBadgeSymbolName",

    standalone: true,
  },
)
export class GetQuantityBadgeSymbolNamePipe
  implements PipeTransform {

  public transform(value: number): `${ TwoToFifty }CircleFill` | "1CircleFill" | "QuestionmarkCircleFill"
  public transform(value?: null): ""
  public transform(value?: number | null): `${ TwoToFifty }CircleFill` | "1CircleFill" | "QuestionmarkCircleFill" | "" {
    if (value)
      return value <= 50 ? value >= 2 ? `${ value as TwoToFifty }CircleFill` : "1CircleFill" : "QuestionmarkCircleFill";

    return "";
  }

}
