// Angry Judge: The Short Rant Contest — one line, one rant, no mercy.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const RANT =
  "My printer works perfectly all week, then the second I need one urgent document it develops stage fright, eats the paper, and blinks at me like this is somehow my fault.";

// Self-checking gate: the entry must stay exactly one rant — one line,
// non-empty, under 200 characters, ending in terminal punctuation.
const problems: string[] = [];
if (RANT.trim().length === 0) problems.push("rant is empty");
if (RANT.includes("\n")) problems.push("rant spans more than one line");
if (RANT.length > 200)
  problems.push(`rant is ${RANT.length} chars, over the 200-char cap`);
if (!/[.!?]$/.test(RANT)) problems.push("rant lacks terminal punctuation");
if (problems.length > 0) {
  throw new Error(`Entry failed its self-check: ${problems.join("; ")}`);
}

// The competition's gate reads /output/entry.txt (MAKEFUN_OUTPUT_DIR when
// set), so the rant goes there with no trailing newline — and stdout carries
// exactly the same line, nothing else.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), RANT, "utf8");

console.log(RANT);
