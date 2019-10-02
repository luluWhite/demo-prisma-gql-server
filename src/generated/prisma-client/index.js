"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;
require('dotenv').config({ path: '.env.development' });

var models = [
  {
    name: "Post",
    embedded: false
  },
  {
    name: "Course",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: process.env.PRISMA_ENDPOINT
});
exports.prisma = new exports.Prisma();
