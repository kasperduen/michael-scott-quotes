import fs from "fs";
import readline from "readline";

const outOfRangeError = function (line: number, path: string) {
  return new RangeError(
    `Line with index ${line} does not exist in '${path}. Note that line indexing is zero-based'`
  );
};

export const readLine = (line: number, path: string) => {
  return new Promise(function (resolve, reject) {
    if (line < 0 || line % 1 !== 0)
      return reject(new RangeError(`Invalid line number`));

    var cursor = 0,
      input = fs.createReadStream(path),
      rl = readline.createInterface({ input });

    rl.on("line", function (l) {
      if (cursor++ === line) {
        rl.close();
        input.close();
        resolve(l);
      }
    });

    rl.on("error", reject);

    input.on("end", function () {
      reject(outOfRangeError(line, path));
    });
  });
};
