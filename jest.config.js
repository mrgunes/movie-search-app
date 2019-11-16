module.exports = {
  verbose: true,
  collectCoverage: false,
  coverageDirectory: "./coverage",
  setupFilesAfterEnv: ["./setupTests.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"]
};
