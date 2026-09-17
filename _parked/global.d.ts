// global.d.ts
import mongoose from "mongoose";

declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
    namespace NodeJS {
      interface Global {
        _mongoClientPromise?: Promise<any>;
      }
    }
  }
  
export {};
  