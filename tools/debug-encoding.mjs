import fs from "node:fs";
const lessons = JSON.parse(fs.readFileSync("tools/data/lessons.json", "utf8"));
const landings = JSON.parse(fs.readFileSync("tools/data/landings.json", "utf8"));

function normKey(p) {
  return p.split("/").map((s) => { try { return decodeURIComponent(s); } catch { return s; } }).join("/");
}

const all = [...lessons, ...landings];
const target = all.find((x) => x.path.includes("condiciones-if-else"));
console.log("stored path:", JSON.stringify(target.path));

const map = new Map(all.map((x) => [normKey(x.path), x.path]));

const segsEnc = target.path.replace(/^\/|\/$/g, "").split("/");
const reEnc = "/" + segsEnc.join("/") + "/";
console.log("ENC lookup key:", JSON.stringify(normKey(reEnc)), "HIT:", map.has(normKey(reEnc)));

const segsDec = segsEnc.map((s) => { try { return decodeURIComponent(s); } catch { return s; } });
const reDec = "/" + segsDec.join("/") + "/";
console.log("DEC lookup key:", JSON.stringify(normKey(reDec)), "HIT:", map.has(normKey(reDec)));

console.log("map has stored normKey:", map.has(normKey(target.path)));
console.log("raw segment:", JSON.stringify(segsEnc[segsEnc.length - 1]));
console.log("decoded segment:", JSON.stringify(segsDec[segsDec.length - 1]));
