declare namespace Express {
  interface Request extends TglRequest {}
}

declare interface TglRequest {
  tgl?: Tgl;
}

declare module "tgl" {
  import express from "express";
  import Keyv from "keyv";

  export interface Toggle {
    name: string;
    description: string;
    defaultValue: boolean;
  }

  export function middleware(tgl: Tgl): express.Handler;

  export function router(tgl: Tgl): express.Router;

  export class Tgl {
    constructor({
      toggles,
      storage,
      interval
    }: {
      toggles: Toggle[];
      storage: Keyv<boolean>;
      interval?: number;
    });

    toggles: boolean[];

    get(key: string): boolean;

    set(key: string, value: boolean): Promise<void>;
  }
}
