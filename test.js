async function willThrow() {
  throw new Error("hi");
}

async function main() {
  try {
    await willThrow();
  } catch (err) {
    console.log(JSON.stringify(err, Object.getOwnPropertyNames(err)));
  }
}
main();
