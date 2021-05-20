const authresolver = require("./authResolver");
const postresolver = require("./postResolver");
const rootResolver = {
  ...authresolver,
  ...postresolver,
};

module.exports = rootResolver;
