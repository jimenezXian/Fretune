const fs = require("fs");
const path = require("path");

const patch = "  target_compile_options($LIB PRIVATE -Wno-unused-const-variable)";

const targets = [
  {
    lib: "worklets",
    cmake: path.join(__dirname, "..", "node_modules", "react-native-worklets", "android", "CMakeLists.txt"),
    search: "  target_compile_reactnative_options(worklets PUBLIC)",
  },
  {
    lib: "reanimated",
    cmake: path.join(__dirname, "..", "node_modules", "react-native-reanimated", "android", "CMakeLists.txt"),
    search: "  target_compile_reactnative_options(reanimated PUBLIC)",
  },
];

for (const { lib, cmake, search } of targets) {
  if (!fs.existsSync(cmake)) continue;

  let content = fs.readFileSync(cmake, "utf8");
  const line = patch.replace("$LIB", lib);

  if (content.includes(line)) continue;

  content = content.replace(search, search + "\n" + line);
  fs.writeFileSync(cmake, content, "utf8");
  console.log(`Patched ${lib} CMakeLists.txt`);
}